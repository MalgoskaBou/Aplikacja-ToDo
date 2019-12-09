const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    _list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    checked: {
        type: Boolean,
    }
});

const List = mongoose.model("List", listSchema);

module.exports = List;