const config = require('config');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function() {
  // Generate an auth token for the user
  const token = jwt.sign(
    {
      _id: this._id,
      login: this.login,
      email: this.email
    },
    config.get('jwtPrivateKey')
    );
  return token;
};

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    login: Joi.string()
      .min(3)
      .max(30)
      .required(),
      email: Joi.string()
      .min(8)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  });
  return schema.validate(user);
}

module.exports = {User, validateUser};
