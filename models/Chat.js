// Schema for Chat
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    sender: String,
    receiver: String,
    message: String,
    date: String,
}, { timestamps: true });

mongoose.models = {};

module.exports = mongoose.model('Chat', ChatSchema);