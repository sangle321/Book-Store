const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone : String,
    password: String
});

var User = mongoose.model('User', userSchema, 'users');
module.exports = User;