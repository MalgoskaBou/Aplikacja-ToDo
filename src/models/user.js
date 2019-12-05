const mongoose = require('mongoose');
// const validator = require('validator'); ? const joi = require('joi'); ?
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    tokens: [],
});

module.exports = mongoose.model('User', userSchema);