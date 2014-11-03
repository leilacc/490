var _ = require("underscore");
var mongoose = require("mongoose");

var models = require("./models.js");

// Connection URL
var url = "mongodb://loomuser:l00mieforcocoapuffs@ds045970.mongolab.com:45970/loom";

var connect = function(callback) {
    mongoose.connect(url);

    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
        callback();
    });
}

var createUser = function(name, username, password, callback) {
    var user = new models.User({
        name: name,
        username: username,
        password: password
    });

    user.save(callback);
}

var getUser = function(userId, callback) {
    return models.User.findOne({id: userId}).exec(callback);
}

var getUserByUsername = function(username, callback) {
    return models.User.findOne({username: username}).exec(callback);
}

var _getUserFolder = function(userId, callback) {
    return models.FolderPin.findOne({owner: userId, depth: 0}).exec(callback);
}

var findPin = function(path, parentFolder) {
    if (path.length == 0)
        return parentFolder;

    var child = parentFolder.findChildByName(path[0]);
    if (path.length == 1)
        return child;

    return findPin(_.rest(path), child);
}

var findPinForUser = function(path, userId, callback) {
    _getUserFolder(userId, function(err, folder) {
        callback(err, findPin(path, folder));
    });
}

var createQuestion = function(question, answers, folderPath, ownerId, callback) {
    var folder = findPinForUser(folderPath, ownerId);
    console.log(folder);

    var questionObj = new models.QuestionPin({
        name: question,
        depth: folder.depth + 1,
        answers: answers,
        pins: []
    });

    questionObj.save(callback);
};

var pinAnswer = function(answer, path, ownerId, callback) {
    findPinForUser(path, ownerId, function(err, questionPin) {
        questionPin.pins.push(answer); 
        callback(err);
    });
}

module.exports.models = models;
module.exports.connect = connect;
module.exports.getUser = getUser;
module.exports.getUserByUsername = getUserByUsername;
module.exports.createQuestion = createQuestion;
