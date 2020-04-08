const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    image: String,
    title: String,
    author: String,
    price : Number,
    detail: String
});

let Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;