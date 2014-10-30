var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

/***** PINS *****/

var commonPinProperties = {
    name: String,
    last_updated: Date,
    
    owner: ObjectId,
    can_read: [ObjectId],
    can_write: [ObjectId]
}

// Question Pin
var questionPinSchema = new mongoose.Schema({
    answers: [{}]    
});
questionPinSchema.add(commonPinProperties);
var QuestionPin = mongoose.model('QuestionPin', questionPinSchema);

// Folder Pin
var folderPinSchema = new mongoose.Schema();
folderPinSchema.add(commonPinProperties);
folderPinSchema.add({
    children: [folderPinSchema]
});
var FolderPin = mongoose.model('FolderPin', folderPinSchema);

/***** EXPORTS *****/
module.exports.QuestionPin = QuestionPin;
module.exports.FolderPin = FolderPin;
