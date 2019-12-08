const mongoose = require('mongoose');
const {User} = require('./user');

const listSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: User,
    },
    list_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    }
});

module.exports = mongoose.model('List', listSchema);