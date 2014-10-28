var db = require('./db');

var addPin(qaPair, path, userId) {
	//Where do we add qaPair?
	//Does the question exist?
	//->Generate unique questionID
	db.getOrCreateQuestion(path, qaPair, userID, function(error, question){
		question.answers.push(qaPair[1]);
		db.updateQuestion(question);
	});
	//->canRead
	//->canWrite
	//lastUpdated
	//Add answer from qaPair into the object's answers list
}

var addFolder(name, path, userId) {

}

// pin could either be an id or the actual object
var shareWithUser(canWrite, pin) {

}

module.exports.addPin = addPin;
module.exports.addFolder = addFolder;

// import with: file = include("./file.js")