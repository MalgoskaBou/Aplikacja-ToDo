const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: {},
    list_id: {},
    task_name: {},
    checked: {}
});

module.exports = mongoose.model('Task', taskSchema);