const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  _listID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  checked: {
    type: Boolean,
    default: false,
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;