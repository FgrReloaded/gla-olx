// Schema for item
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: String,
    price: String,
    desc: String,
    images: Array,
    category: String,
    subCategory: String,
    seller: String,
    sellerName: String,
    sellerPic: String,
    buyer: String,
    views: {
        type: Number,
        default: 0
    },
    status: String,
}, { timestamps: true });

mongoose.models = {};

module.exports = mongoose.model('Item', ItemSchema);