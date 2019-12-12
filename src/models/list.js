const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: "User"
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
