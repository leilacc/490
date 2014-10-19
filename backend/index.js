var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var watson = require('./watson.js');

// Routing
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('css', path.join(__dirname, '../public/css'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public'))); // use html files in test subdir

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/search', function (req, res) {
  res.render('search');
});

app.get('/report', function (req, res) {
  res.render('report');
});

var askQuestion = function(question, socket) {
    var numAnswersReceived = 0;
    watson.askAndPoll(question, 10, 2000, function(error, watsonResponse) {
        if (error) {
            socket.emit("error", {error: error});
            return;
        }

        var answers = watsonResponse.question.answers;
        var newNumAnswers = Object.keys(answers).length;

        if (newNumAnswers > numAnswersReceived) {
            socket.emit("new answers", answers);
            numAnswersReceived = newNumAnswers;
        }
    });
}

var createQuestionFromQuery = function(query) {
    var judge = query.judge;
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
