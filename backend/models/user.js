const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // We want array of strings
    crypto: { type: [String], required: false },
    news: { type: [String], required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
