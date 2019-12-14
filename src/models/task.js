const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const taskSchema = new mongoose.Schema({
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  _listID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List"
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);
Joi.objectId = require("joi-objectid")(Joi);
function validateTask(task) {
  const schema = Joi.object({
    _userID: Joi.objectId(),
    _listID: Joi.objectId(),
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    checked: Joi.boolean()
  });
  return schema.validate(task);
}

module.exports = Task;
exports.validate = validateTask;
