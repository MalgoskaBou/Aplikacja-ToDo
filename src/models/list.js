const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const JoiObjectId = require("joi-objectid");
validateObjectId = JoiObjectId(Joi);

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

function validateList(list) {
  const schema = Joi.object({
    userID: validateObjectId(),
    name: Joi.string()
      .min(1)
      .max(30)
      .required()
  });
  return schema.validate(list);
}

module.exports = {List, validateList};