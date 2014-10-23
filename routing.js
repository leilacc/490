var auth = require('./auth');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var views = {
  '/': 'index',
  '/search': 'search',
  '/report': 'report',
  '/login': 'login'
};

var renderOnGet = function(path, view, app) {
    app.get(path, function(req, res) {
        vars = {};
        if (req.user) {
          vars['username'] = req.user.name.toUpperCase();
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

    app.use(session({ secret: 's00pers3kret', maxAge: 360*5 }));
    app.use(passport.initialize());
    app.use(passport.session());

    for (var path in views) {
        renderOnGet(path, views[path], app);
    }

    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
}
