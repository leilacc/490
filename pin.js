var db = require('./db');

var addPin = function(qaPair, path, userId) {
	db.create(qaPair, path, userId);
}

var createFolder = function(name, path, userId) {
	return db.createFolder(name, path)
}

// pin could either be an id or the actual object
var shareWithUser = function(canWrite, pin) {

}

module.exports.addPin = addPin;
module.exports.createFolder = createFolder;

// import with: file = include("./file.js")