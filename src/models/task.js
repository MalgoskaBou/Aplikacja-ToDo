const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const taskSchema = new mongoose.Schema({
  _list: {
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
    type: Boolean
  }
});

const Task = mongoose.model("Task", taskSchema);
function validateTask(task) {
  const schema = Joi.object({
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
