var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

var db = require('./db');
var pin = require('./pin');
var watson = require('./watson');
require('./routing')(express, app);

var askQuestion = function(data, socket) {
    var question = data.question;
    var userId = data.userId;
    var currentPath = data.currentPath;

    var numAnswersReceived = 0;
    watson.askAndPoll(question, 10, 2000, function(error, watsonResponse) {
        if (error) {
            socket.emit("error", {error: error});
            return;
        }

        var answers = watsonResponse.question.answers;
        var newNumAnswers = Object.keys(answers).length;

        var evidence = watsonResponse.question.evidencelist;
        for (var i = 0; i < answers.length; i++) {
            answers[i]['evidence'] = evidence[i];
        }

        if (newNumAnswers > numAnswersReceived) {
            socket.emit("new answers",
                        {question: question, answers: answers});
            db.createQuestion(question, answers, currentPath, userId);
            numAnswersReceived = newNumAnswers;
        }
    });
}

var createQuestionFromQuery = function(query) {
    var judge = query.judge;
    if (judge && judge.toLowerCase().indexOf("judge") == -1) {
        judge = "Judge" + judge;
    }
    var issue = query.issue;
    var previous_case = query.case;

    if (judge && issue && previous_case) {
        return "What did " + judge + " think about " + issue + " in " + previous_case + "?";
    }

    if (judge && issue) {
        return "What does " + judge + " think about " + issue + "?";
    }

    if (issue && previous_case) {
        return "What was the precedent for " + issue + " in " + previous_case + "?";
    }

    if (judge && previous_case) {
        return "What was the decision of " + judge + " in " + previous_case + "?";
    }

    if (issue) {
        return "What is the precedent for " + issue + "?";
    }

    if (judge) {
        return "What are the previous decisions of " + judge + "?";
    }

    if (previous_case) {
        return "What was the decision in " + previous_case + "?";
    }
}

var queryCase = function(query, socket) {
    askQuestion(createQuestionFromQuery(query), socket);
}

io.on('connection', function(socket) {
    console.log('a user connected');
      
    socket.on("ask question", function(data) { 
        askQuestion(data, socket);
    });

    socket.on("query case", function(query) {
        queryCase(query, socket);
    });

    socket.on("create folder", function(args) {
        name = args.name;
        path = args.path;
        userId = args.userId;

        db.createFolder(name, path, userId);
    })
});

http.listen(3000, function () {
    console.log('listening at http://localhost:3000');
    db.connect(function() {
        console.log("Connected to the database");
    });
});
