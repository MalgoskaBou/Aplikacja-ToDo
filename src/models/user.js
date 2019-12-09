const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // _id: Schema.Types.ObjectId, <- ID dodawane jest automatycznie przez MongoDB
  login: {
    type: String,
    required: true,
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
  // Nie trzyma się tokenów w bazie danych
  //   tokens: [
  //     {
  //       token: {
  //         type: String,
  //         required: true
  //       }
  //     }
  //   ]
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122

// JWT nie jest zainstalowany ani skonfigurowany

// userSchema.methods.generateAuthToken = async function() {
//   // Generate an auth token for the user
//   const user = this;
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

userSchema.statics.findByCredentials = async (login, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error({ error: "Invalid login!" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid password!" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
