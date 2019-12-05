const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    list_id: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
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