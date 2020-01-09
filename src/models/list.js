const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const listSchema = new mongoose.Schema({
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  }
});

const List = mongoose.model("List", listSchema);

Joi.objectId = require("joi-objectid")(Joi);
function validateList(list) {
  const schema = Joi.object({
    _userID: Joi.objectId(),
    name: Joi.string()
      .min(1)
      .max(30)
      .required()
  });
  return schema.validate(list);
}

module.exports = {List, validateList};