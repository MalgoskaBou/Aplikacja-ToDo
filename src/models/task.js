const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { userSchema } = require("./user");
const { listSchema } = require("./list");

const taskSchema = new mongoose.Schema({
  user_id: {
    type: userSchema,
    required: true
  },
  list_id: {
    type: listSchema,
    required: true
  },
  task_name: {
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
    task_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    checked: Joi.boolean()
  });
  return schema.validate(task);
}

exports.Task = Task;
exports.validate = validateTask;
