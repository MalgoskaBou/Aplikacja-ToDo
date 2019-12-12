const Task = require("../models/task");
const List = require("../models/list");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", /*[auth],*/ async (req, res) => {
     // Return users tasks
    const tasks = await Task.find({"_userID": req.body.userID})
        .select("-__v");
    res.send(tasks);
})

router.post("/", /*[auth],*/ async (req, res) => {
    // Add task to given list
    try {
        // Check if given list exist
        const list = await List.findById(req.body.listID);
        // If not send 400 status
        if (!list) return res.status(400).send("User not found.");
        // Check if user reached tasks amount limit
        const savedTasks = await Task.find({"_userID": req.body.userID});
        if (savedTasks.length == 15) return res.status(400).send("The user has reached tasks amount limit (max 15).");
        // Create new task and save it to db
        const task = new Task({
            _userID: req.body.userID,
            _listID: req.body.listID,
            name: req.body.name,
        });
        await task.save();
        // Send new task as a response    
        res.status(201).send(task);
    } catch (error) {
        // WHAT STATUS CODE SHOULD BE USED?
        res.status(500).send(error.message);
    }
})

module.exports = router;