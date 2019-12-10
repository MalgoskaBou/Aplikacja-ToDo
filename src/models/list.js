const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const listSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "User"
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const List = mongoose.model("List", listSchema);

function validateList(list) {
  const schema = Joi.object({
    _user: Joi.string().required(),
    name: Joi.string()
      .min(1)
      .max(30)
      .required()
  });
  return schema.validate(list);
}

module.exports = List;
exports.validateList = validateList;
