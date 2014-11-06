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
  '/search': {view: 'search', requiresAuth: true},
  '/report': {view: 'report', requiresAuth: true},
  '/cases': {view: 'cases', requiresAuth: true},
  '/history': {view: 'history', requiresAuth: true}
};

var renderOnGet = function(path, view, app) {
    app.get(path, function(req, res) {

      var requiresAuth = false;
      if (view.requiresAuth) {
        view = view.view;
        requiresAuth = true;
      }

      vars = {};
      if (req.user) {
        vars['username'] = req.user.name.toUpperCase();
        if (view == 'index') {
            // redirect logged-in users to search page
            view = 'search'
        }
      }
      // else if (requiresAuth) {
      //   view = 'login';
      // }

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

    app.use(session({ secret: 's00pers3kret', maxAge: 360*2000000 }));
    app.use(passport.initialize());
    app.use(passport.session());

    for (var path in views) {
        renderOnGet(path, views[path], app);
    }

    app.post('/ask', askQuestion);
    app.post('/share', shareWithUser);
    app.post('/save', saveCase);
    app.get('/folder', getUserFolder);

    // this isn't really a GET, but I didn't want it to conflict with the
    // view name.
    app.post('/history', getHistory);

    app.post('/login', auth.login);
    app.post('/register', auth.register);
    app.get('/logout', auth.logout);
}

// I couldn't find anywhere better to dump these functions. sorry.
var askQuestion = function(req, res) {
    var question = req.param('question');
    var currentPath = req.param('currentPath');
    if (!currentPath)
        currentPath = []

    if (!req.user) {
        res.redirect(500, 'login');
        return;
    }

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
            db.createQuestion(question, answers, currentPath, req.user._id);
            numAnswersReceived = newNumAnswers;
        }
    });
}

var getHistory = function(req, res) {
    var userId = req.user._id;
    db.getHistory(userId, function(err, history) {
        res.json(history);
    });
}

var shareWithUser = function(req, res) {
    var userId = req.body.userId;
    var canWrite = req.body.canWrite;
    var pinId = req.body.pinId;

    db.getPin(pinId, function(err, pin) {
      pin.shareWithUser(userId, canWrite);
      res.end();
    })
}

var saveCase = function(req, res) {
    var question = req.body.question;
    var answer = req.body.answer;
    var path = req.body.path;
    var userId = req.user._id;

    // see if the pin exists in the user root folder, in which case we need to
    // save it into the correct path
    db.findPinForUser([question], function(err, pin) {
        db.getUserFolder(userId, function(err, folder) {
            if (pin) {
                pin.moveInto(path, folder);
                res.json(folder);
            } else {
                pin = db.findPin(path.concat([question]), folder);
            }

            pin.pins.push(answer);
            res.json(pin);
        });
    });
}

var getUserFolder = function(req, res) {
    var userId = req.user._id;

    db.getUserFolder(userId, function(err, folder) {
        res.json(folder);
    });
}
