const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
// const validator = require('validator'); ? const joi = require('joi'); ?
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  tokens: []
});
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required()
  });
  return schema.validate(user);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
