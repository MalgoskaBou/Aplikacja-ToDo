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
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List"
    }
  ]
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
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
exports.validate = validateUser;
