const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { userSchema } = require("./user");

const listSchema = new mongoose.Schema({
  user_id: {
    type: userSchema,
    required: true
  },
  list_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  }
});
const List = mongoose.model("List", listSchema);

function validateList(list) {
  const schema = Joi.object({
    list_name: Joi.string()
      .min(1)
      .max(30)
      .required()
  });
  return schema.validate(list);
}
exports.listSchema = listSchema;
exports.List = List;
exports.validateList = validateList;
