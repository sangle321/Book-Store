const mongoose = require('mongoose');

let authorSchema = mongoose.Schema({
    image: String,
    name: String,
    title: String
});

let Author = mongoose.model('Author', authorSchema, 'author');

module.exports = Author;