const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    list_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    }
});

module.exports = mongoose.model('List', listSchema);