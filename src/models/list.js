const mongoose = require('mongoose');
const {userSchema} = require('./user');

const listSchema = new mongoose.Schema({
    user_id: {
        type: userSchema,
        required: true,
    },
    list_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    }
});

module.exports = mongoose.model('List', listSchema);