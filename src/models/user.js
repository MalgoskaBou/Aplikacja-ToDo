const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});
function validateUser(user) {
  const schema = Joi.object({
    login: Joi.string()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  });
  return schema.validate(user);
}

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

userSchema.methods.generateAuthToken = function() {
  // Generate an auth token for the user
  const token = jwt.sign(
    {
      _id: this._id,
      login: this.login,
      password: this.password
    },
    config.get('jwtPrivateKey')
    );
  return token;
};

module.exports = mongoose.model("User", userSchema);
exports.validate = validateUser;
