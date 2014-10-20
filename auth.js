var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

// we are temporarily NoSQL until we get access to a MySQL DB
var users = {
	"akbiggs": {id: "akbiggs", name: "Alexander Biggs", pass: "dumbpass"},
	"leila": {id: "leila", name: "Leila Chan Currie", pass: "dumbpass"},
	"yana": {id: "yana", name: "Yana Davis", pass: "dumbpass"},
	"daniil": {id: "daniil", name: "Daniil Kouznetsov", pass: "dumbpass"},
	"steven": {id: "steven", name: "Steve Engels", pass: "dumbpass"},
	"daphnei": {id: "daphnei", name: "Daphne Ippolito", pass: "dumbpass"}
};

passport.serializeUser(function(user, done) {
	console.log("serializing");
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserializing");
	var user = users[id];
	console.log(user);
	done(null, user);
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		var user = users[username];
		
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}

		if (password !== user.pass) {
			return done(null, false, { message: 'Incorrect password.' });
		}

		return done(null, user);
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
