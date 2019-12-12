const User = require("../models/user");
const List = require("../models/list");
const Task = require("../models/task");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", /*[auth],*/ async (req, res) => {
    // Return users lists
    const lists = await List.find({"_userID": req.body.userID})
        .select("-__v");
    res.send(lists);
})

router.post("/", /*[auth],*/ async (req, res) => {
    // Add new list
    try {
        // Check if given user exist
        const user = await User.findById(req.body.userID);
        // If not send 400 status
        if (!user) return res.status(400).send("User not found.");
        // Check if user reached list amount limit
        const savedLists = await List.find({"_userID": req.body.userID});
        if (savedLists.length == 3) return res.status(400).send("The user has reached lists amount limit (max 3).");
        // Create new list and save it to db
        const list = new List({
            _userID: req.body.userID,
            name: req.body.name,
        });
        await list.save();
        // Send new list as a response    
        res.status(201).send(list);
    } catch (error) {
        // WHAT STATUS CODE SHOULD BE USED?
        res.status(400).send(error.message);
    }
})

router.delete("/:id", async (req, res) => {
    // Remove the list and all tasks from that list
    try {
        const listID = req.params.id;
        // Search for the list
        const list = await List.findById(listID);
        // If it doesn't exist send 400 status
        if (!list) return res.status(400).send("List not found.");
        // Remove the list from the lists collection
        await List.deleteOne({_id: listID});
        // Remove tasks
        await Task.deleteMany({_listID: listID});
        // Send 200 status
        res.status(200).send("List is successfully removed.");
    } catch (error) {
        // Catch error and send response
        res.status(400).send(error.message);
    }
})

module.exports = router;