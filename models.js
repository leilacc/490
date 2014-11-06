var _ = require('underscore');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var util = require('util');

var model = mongoose.model;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/***** USERS *****/
var UserSchema = new Schema({
  name: String,
  username: String,
  password: String
});
var User = mongoose.model('User', UserSchema);

/***** PINS *****/

// weird Mongoose way of handling deriving schemas,
// see http://mongoosejs.com/docs/api.html#model_Model.discriminator
function BaseSchema() {
    Schema.apply(this, arguments);

    this.add({
        name: String,
        depth: Number,

        owner: ObjectId,
        parent: ObjectId,
        canRead: [ObjectId],
        canWrite: [ObjectId]
    });

    this.methods.ownedBy = function(userId) {
        return this.owner === userId;
    }

    this.methods.readableBy = function(userId) {
        return this.canRead.indexOf(userId) !== -1;
    }

    this.methods.writableBy = function(userId) {
        return this.canWrite.indexOf(userId) !== -1;
    }

    this.methods.isFolder = function() {
        return this.children;
    }

    this.methods.shareWithUser = function(userId, canWrite) {
        // don't share again if the pin has  already been shared to this user
        if (this.readableBy(userId))
            return false;

        this.canRead.push(userId);

        if (canWrite) {
            this.canWrite.push(userId);
        }

        if (this.isFolder()) {
            for (var i = 0; i < this.children.length; i++) {
                shareWithUser(this.children[i], userId, canWrite);
            }
        }

        this.save();

        return true;
    }

    this.methods.copyInto = function(folderPath, cwd) {
        if (folderPath.length == 0) {
            return;
        }

        var childFolder = _(cwd.children).findWhere({name: folderPath[0]});
        if (folderPath.length == 1) {
            childFolder.children.push(this);
            childFolder.save();
        } else {
            this.copyInto(_(folderPath).rest(), childFolder);
        }

        cwd.save();
    }

    this.methods.moveInto = function(folderPath, cwd) {
        // TODO: When removing, need to go up through all the parents
        // and remove it from there, too.
        cwd.children = _(cwd.children).filter(function(name) { return this.name != name; });
        this.copyInto(folderPath, cwd);
    }

    this.methods.propogateChangesUpwards = function() {
        if (this.parent != null) {
            FolderPin.findById(this.parent).exec(function(err, folder) {
                folder.save();
                folder.propogateChangesUpwards();
            });
        }
    }

    this.plugin(timestamps);
}
util.inherits(BaseSchema, Schema);

var PinSchema = new BaseSchema;
var Pin = mongoose.model('Pin', PinSchema);

/* Question Pin */
var QuestionPinSchema = new BaseSchema({
    answers: [{}],
    pins: [{}]
});
var QuestionPin = Pin.discriminator('QuestionPin', QuestionPinSchema);

/* Folder Pin */
var FolderPinSchema = new BaseSchema({
    children: [PinSchema],
});

FolderPinSchema.methods.findChildByName = function(name) {
    return _(this.children).findWhere({name: name});
}

FolderPinSchema.methods.containedQuestions = function() {
    return this.children.filter(function(pin) { return !pin.isFolder(); });
}

var FolderPin = Pin.discriminator('FolderPin', FolderPinSchema);

/***** EXPORTS *****/
module.exports.User = User;
module.exports.QuestionPin = QuestionPin;
module.exports.FolderPin = FolderPin;
