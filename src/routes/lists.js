const User = require("../models/user");
const List = require("../models/list");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const lists = await List.find()
        .select("-__v");
    res.send(lists)
})

router.post("/", /*[auth],*/ async (req, res) => {
    // Add new list to user
    try {
        // Check if given user exist
        const user = await User.findById(req.body.userID);
        // If not send 400 status
        if (!user) return res.status(400).send("User not found.");
        // If not create new list and save it to db
        const list = new List({
            _user: user._id,
            name: req.body.name,
        });
        await list.save();
        // Add list to array and save updated user
        user.lists.push(list);
        await user.save();
        // Send new list as a response    
        res.status(201).send(list);
    } catch (error) {
        // Catch error and send response
        res.status(400).send(error.message);
    }
})

module.exports = router;