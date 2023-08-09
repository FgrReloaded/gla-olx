// Schema for Chat
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Wishlist = new Schema({
    userId: String,
    productId: String,
    product: Object
}, { timestamps: true });

mongoose.models = {};

module.exports = mongoose.model('wishlist', Wishlist);