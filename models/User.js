// Schema for User
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    rollno: String,
    phone: String,
    address: String,
    hostel: String,
}, { timestamps: true });

mongoose.models = {};

module.exports = mongoose.model('User', UserSchema);