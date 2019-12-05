const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    user_id: {},
    list_name: {}
});

module.exports = mongoose.model('List', listSchema);