var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db');

passport.serializeUser(function(user, done) {
	console.log("serializeUser");
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db.getUser(id, function(err, user) {
		console.log("deserializeUser");
		done(null, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		db.getUserByUsername(username, function(err, user) {
			console.log(user);
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

var logout = function(req, res) {
	req.logout();
	res.redirect("/");
}

module.exports.login = login;
module.exports.logout = logout;
