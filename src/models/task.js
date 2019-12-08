const mongoose = require('mongoose');
const {User} = require('./user');
const {List} = require('./list');

const taskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    list_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: List,
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