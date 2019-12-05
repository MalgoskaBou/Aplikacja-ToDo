const mongoose = require('mongoose');
// const validator = require('validator'); ? const joi = require('joi'); ?
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    login: {},
    password: {},
    tokens: [],
});

module.exports = mongoose.model('User', userSchema);