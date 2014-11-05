var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db');

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	db.getUser(id, function(err, user) {
		done(null, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		db.getUserByUsername(username, function(err, user) {
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			if (password !== user.password) {
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		});
	}
));

var login = passport.authenticate('local', {
	successRedirect: '/search',
	failureRedirect: '/login'
});

var register = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var name = req.body.name;
	console.log(req.body);

	db.createUser(name, username, password, function(err, user) {
		passport.authenticate('local')(req, res, function () {
			res.redirect('/search');
		});
	});
}

var logout = function(req, res) {
	req.logout();
	res.redirect("/");
}

module.exports.login = login;
module.exports.register = register;
module.exports.logout = logout;
