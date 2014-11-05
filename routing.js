var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var auth = require('./auth');
var watson = require('./watson');
var db = require('./db');

var views = {
  '/': 'index',
  '/login': 'login',
  '/register': 'register',
  '/search': 'search',
  '/report': 'report',
  '/cases': 'cases'
};

var renderOnGet = function(path, view, app) {
    app.get(path, function(req, res) {
      vars = {};
      if (req.user) {
        vars['username'] = req.user.name.toUpperCase();
        if (view == 'index') {
            // redirect logged-in users to search page
            view = 'search'
        }
      }
      res.render(view, vars);
    });
}

exports = module.exports = function(express, app) {
    var path = require('path');
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('css', path.join(__dirname, 'public/css'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({ secret: 's00pers3kret', maxAge: 360*2000 }));
    app.use(passport.initialize());
    app.use(passport.session());

    for (var path in views) {
        renderOnGet(path, views[path], app);
    }

    app.post('/ask', askQuestion);
    app.post('/register', auth.register);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
}

// I couldn't find anywhere better to dump this. sorry.
var askQuestion = function(req, res) {
    var question = req.param('question');
    var currentPath = req.param('currentPath');
    if (!currentPath)
        currentPath = []
    var userId = req.user._id;

    var numAnswersReceived = 0;
    watson.askAndPoll(question, 10, 2000, function(error, watsonResponse) {
        if (error) {
            res.status(500).json({error: error});
            return;
        }

        var answers = watsonResponse.question.answers;
        var newNumAnswers = Object.keys(answers).length;

        var evidence = watsonResponse.question.evidencelist;
        for (var i = 0; i < answers.length; i++) {
            answers[i]['evidence'] = evidence[i];
        }

        if (newNumAnswers > numAnswersReceived) {
            res.json({question: question, answers: answers});
            db.createQuestion(question, answers, currentPath, userId);
            numAnswersReceived = newNumAnswers;
        }
    });
}
