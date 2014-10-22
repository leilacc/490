var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var watson = require('./watson.js');
require('./routing.js')(express, app);

var askQuestion = function(question, socket) {
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
      
    socket.on("ask question", function(q) { 
        askQuestion(q, socket);
    });

    socket.on("query case", function(q) {
        queryCase(q, socket);
    });
});

http.listen(3000, function () {
    console.log('listening at http://localhost:3000');
});
