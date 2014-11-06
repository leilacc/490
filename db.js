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

    var userFolder = new models.FolderPin({
        name: name,
        owner: user.id,
        canRead: [user.id],
        canWrite: [user.id],
        parent: null,
        depth: 0,
        children: []
    });

    user.save(function(err, user) {
        userFolder.save(callback);
    });
}

var createQuestion = function(question, answers, folderPath, ownerId, callback) {
    findPinForUser(folderPath, ownerId, function(err, folder) {
        var questionObj = new models.QuestionPin({
            name: question,
            depth: folder.depth + 1,
            answers: answers,

            owner: ownerId,
            parent: folder._id,
            canRead: folder.canRead,
            canWrite: folder.canWrite,
            
            pins: []
        });

        folder.children.push(questionObj);

        questionObj.save(function(err, _) {
            folder.save(callback);
        });
    });
};

var createFolder = function(name, path, cwd, callback) {
    var parent = findPin(path, cwd);

    var newFolder = new models.FolderPin({
        name: name,
        depth: parent.depth + 1,

        owner: parent.owner,
        parent: parent._id,

        // TODO: Do these arrays need to be cloned instead of just referenced?
        // e.g. what if user wants to remove permissions on a folder within
        // folder
        canRead: parent.canRead,
        canWrite: parent.canWrite,

        children: []
    })

    newFolder.save(function(err, folder) {
        models.FolderPin.findByIdAndUpdate(
            parent._id,
            { $push: { children: newFolder } }
        ).exec(function(err, parent) {
            parent.propogateChangesUpwards(function(root) {
                callback(null, folder);
            })
        });
    });
}   

var modelFinder = function(model, attr) {
    return function(attrValue, callback) {
        query = {}
        query[attr] = attrValue;
        model.findOne(query).exec(callback);
    }
}

var getUser             = modelFinder(models.User, "_id");
var getUserByUsername   = modelFinder(models.User, "username");
var getPin              = modelFinder(models.Pin, "_id");

var getUserFolder = function(userId, callback) {
    models.FolderPin.findOne({owner: userId, depth: 0}).exec(callback);
}

var findPin = function(path, parentFolder) {
    if (path.length === 0)
        return parentFolder;

    console.log(path[0]);
    console.log(parentFolder);
    var child = parentFolder.findChildByName(path[0]);
    if (path.length === 1)
        return child;

    return findPin(_.rest(path), child);
}


var findPinForUser = function(path, userId, callback) {
    getUserFolder(userId, function(err, folder) {
        callback(err, findPin(path, folder));
    });
}

var pinAnswer = function(answer, path, ownerId, callback) {
    findPinForUser(path, ownerId, function(err, questionPin) {
        questionPin.pins.push(answer); 
        callback(err);
    });
}

var getHistory = function(userId, callback) {
    models.QuestionPin.find({owner: userId}).sort({createdAt: "desc"}).exec(callback);
}

module.exports.models = models;
module.exports.connect = connect;
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.getUserFolder = getUserFolder;
module.exports.getUserByUsername = getUserByUsername;
module.exports.getPin = getPin;
module.exports.createQuestion = createQuestion;
module.exports.createFolder = createFolder;
module.exports.getHistory = getHistory;