const mongoose = require('mongoose');
const {userSchema} = require('./user');
const {listSchema} = require('./list');

const taskSchema = new mongoose.Schema({
    user_id: {
        type: userSchema,
        required: true,
    },
    list_id: {
        type: listSchema,
        required: true,
    },
    task_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    checked: {
        type: Boolean,
    }
});

module.exports = mongoose.model('Task', taskSchema);