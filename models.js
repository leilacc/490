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

    this.plugin(timestamps);
}
util.inherits(BaseSchema, Schema);

var PinSchema = new BaseSchema;
var Pin = mongoose.model('Pin', PinSchema);

// var myPin = new Pin({name: "What is a folder?", owner: user1.id, canRead: [user1.id, user2.id, user3.id], canWrite: [user1.id, user3.id]});

/* Question Pin */
var QuestionPinSchema = new BaseSchema({
    // allowing any kind of JSON data to be stored as an answer until
    // we have a better idea of what Watson gives back
    answers: [{}],
    pins: [{}]
});
var QuestionPin = Pin.discriminator('QuestionPin', QuestionPinSchema);

/* Folder Pin */
var FolderPinSchema = new BaseSchema({
    children: [FolderPinSchema]
});

FolderPinSchema.methods.findChildByName = function(name) {
    return _(this.children).findWhere({name: name});
}

var FolderPin = Pin.discriminator('FolderPin', FolderPinSchema);

// myFolder = new FolderPin({owner: user1.id});
// myFolder2 = new FolderPin({owner: user1.id});
// myFolder3 = new FolderPin({owner: user1.id});
// myRecursiveFolder = new FolderPin({owner: user1.id, children: [myFolder, myFolder2, myFolder3], canRead: [user1.id]});

/***** EXPORTS *****/
module.exports.User = User;
module.exports.QuestionPin = QuestionPin;
module.exports.FolderPin = FolderPin;
