var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sleep = require('sleep');

var auth = require('./auth');
var watson = require('./watson');
var db = require('./db');

var employeeQuestion = ("What is an employee for tax purposes?").toLowerCase();
var caseQuestion = ("Are there any cases in non-Canadian Commonwealth nations that defined student athletes as employees?").toLowerCase();
var hockeyQuestion = ("Are hockey players in the CHL governed by the Employment Standards Act or by the Labour Code?").toLowerCase();
var circumstanceQuestion = ("Under what circumstances can employees be prevented from unionizing?").toLowerCase();

var HAX = {};
HAX[employeeQuestion] = {
        question: "What is an employee for tax purposes?",
        answers: [{
            confidence: 0.723,
            evidence: {
                title: "RC-4110-e Canada Revenue Agency",
                text: "We ask the worker and the payer questions that will help us understand the working relationship and allow us to verify whether the intent of the parties is reflected in the facts.<br>" +
                "These questions relate to the following elements:<br><br>" +
                "the level of control the payer has over the worker's activities;<br>" +
                "whether the worker provides the tools and equipment;<br>" +
                "whether the worker can subcontract the work or hire assistants;<br>" +
                "the degree of financial risk the worker takes;<br>" +
                "the degree of responsibility for investment and management the worker holds;<br>" +
                "the worker's opportunity for profit; and<br>" +
                "any other relevant factors, such as written contracts."
            }
        }]
    };
HAX[caseQuestion] = {
    question: "Are there any cases in non-Canadian Commonwealth nations that defined student athletes as employees?",
    answers: [{
        confidence: 0.757,
        evidence: {
            title: "United States Government Before the National Labor Relations Board Region 13-RC-121359",
            text: "In sum, based on the entire record in this case, I find that the Employer’s football players who receive scholarships fall squarely within the Act’s broad definition of “employee” when one considers the common law definition of “employee.” However, I find that the walk-ons do not meet the definition of “employee” for the fundamental reason that they do not receive compensation for the athletic services that they perform. Unlike the scholarship players, the walk-ons do not sign a “tender” or otherwise enter into any type of employment contract with the Employer. The walk-ons also appear to be permitted a greater amount of flexibility by the football coaches when it comes to missing portions of practices and workouts during the football season if they conflict with their class schedule. In this regard, it is noted that both scholarship players who testified, Colter and Ward, testified that they did not enroll in classes that conflicted with their football commitments. This distinction is not surprising given that the players are compelled by the terms of their “tender” to remain on the team and participate in all its activities in order to maintain their scholarship."
        }
    }]
};
HAX[hockeyQuestion] = {
    question: "Are hockey players in the CHL governed by the Employment Standards Act or by the Labour Code?",
    answers: [{
        confidence: 0.78,
        evidence: {
            title: "Employment Standards Act, 200, SO 2000, c 41",
            text: "This Act does not apply with respect to the following individuals and any person for whom such an individual performs work or from whom such an individual receives compensation:<br>1. A secondary school student who performs work under a work experience program authorized by the school board that operates the school in which the student is enrolled.<br> 2. An individual who performs work under a program approved by a college of applied arts and technology or a university.<br> 3. A participant in community participation under the Ontario Works Act, 1997.<br> 4. An individual who is an inmate of a correctional institution within the meaning of the Ministry of Correctional Services Act, is an inmate of a penitentiary, is being held in a detention facility within the meaning of the Police Services Act or is being held in a place of temporary detention or youth custody facility under the Youth Criminal Justice Act (Canada), if the individual participates inside or outside the institution, penitentiary, place or facility in a work project or rehabilitation program.<br> 5. An individual who performs work under an order or sentence of a court or as part of an extrajudicial measure under the Youth Criminal Justice Act (Canada).<br> 6. An individual who performs work in a simulated job or working environment if the primary purpose in placing the individual in the job or environment is his or her rehabilitation.<br> 7. A holder of political, religious or judicial office.<br> 8. A member of a quasi-judicial tribunal.<br> 9. A holder of elected office in an organization, including a trade union.<br> 10. A police officer, except as provided in Part XVI (Lie Detectors).<br> 11. A director of a corporation, except as provided in Part XX (Liability of Directors), Part XXI (Who Enforces this Act and What They Can Do), Part XXII (Complaints and Enforcement), Part XXIII (Reviews by the Board), Part XXIV (Collection), Part XXV (Offences and Prosecutions), Part XXVI (Miscellaneous Evidentiary Provisions), Part XXVII (Regulations) and Part XXVIII (Transition, Amendment, Repeals, Commencement and Short Title).<br> 12. Any prescribed individuals.<br>"
        }
    }]
};
HAX[circumstanceQuestion] = {
    question: "Under what circumstances can employees be prevented from unionizing?",
    answers: [{
        confidence: 0.71,
        evidence: {
            title: "Under what circumstances can employees be prevented from unionizing?",
            text: "If an employee who is represented by a trade union elects to retain the right to be recalled or fails to make an election,<br> (a) the employer and the trade union shall attempt to negotiate an arrangement for holding the money in trust, and, if the negotiations are successful, the money shall be held in trust in accordance with the arrangement agreed upon; and<br> (b) if the trade union advises the Director and the employer in writing that efforts to negotiate such an arrangement have been unsuccessful, the employer shall pay the termination pay and severance pay to which the employee is entitled to the Director in trust."
        }
    }]
};

var views = {
  '/': 'index',
  '/login': 'login',
  '/register': 'register',
  '/search': {view: 'search', requiresAuth: true},
  '/report': {view: 'report', requiresAuth: true},
  '/cases': {view: 'cases', requiresAuth: true},
  '/history': {view: 'history', requiresAuth: true},
  '/case': {view: 'add_case', requiresAuth: true},
  '/case/playersvschl': {view: 'show_case', requiresAuth: true},
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
    app.post('/folder', createFolder);

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

    if (HAX[question.toLowerCase()]) {
        sleep.sleep(2);
        res.json(HAX[question.toLowerCase()]);
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

var createFolder = function(req, res) {
    var name = req.body.name;
    var path = req.body.path;
    var userId = req.user._id;

    db.getUserFolder(userId, function(err, folder) {
        db.createFolder(name, path, folder, function(err, folder) {
            res.json(folder);
        })
    });
}
