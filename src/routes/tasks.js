const Task = require("../models/task");
const List = require("../models/list");
const User = require("../models/user");
// const auth = require("../middleware/auth");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/", /*[auth],*/ async (req, res) => {
    // Return users tasks
    const tasks = await Task.find({
            _userID: req.body.userID
        })
        .select("-__v");
    res.send(tasks);
})

router.post("/", /*[auth],*/ async (req, res) => {
    // Add task to given list
    try {
        // Check if given user exist
        const user = await User.findById(req.body.userID);
        // If not send 400 status
        if (!user) return res.status(400).send("User not found.");
        // Check if given list exist
        const list = await List.findOne({
            _userID: req.body.userID
        }, {
            _listID: req.body.listID
        });
        // If not send 400 status
        if (!list) return res.status(400).send("User not found.");
        // Check if user reached tasks amount limit
        const savedTasks = await Task.find({
            _userID: req.body.userID
        });
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

router.delete("/:id", async (req, res) => {
    // Remove task from tasks collection
    try {
        const taskID = req.params.id;
        // Search for the task
        const task = await Task.findById(taskID);
        // If it doesn't exist send 400 status
        if (!task) return res.status(400).send("Task not found.");
        // Remove the task 
        await Task.deleteOne({
            _id: taskID
        });
        // Send 200 status
        res.status(200).send("Task is successfully removed.");
    } catch (error) {
        // Catch error and send response
        res.status(400).send(error.message);
    }
})

// Mark a single task as DONE / checked 
router.patch("/", async (req, res) => {
    // Find a task by id
    const tasks = await Task.findById(req.body._id);

    // Find error
    if (tasks === null) return res.status(400).send('Something went wrong!');
    if (tasks.length == 0) return res.status(400).send('Task not found.');

    // Modify param "checked"
    const task = tasks[0];
    db.tasks.update({
        task
    }, {
        $set: {
            checked: req.body.checked
        }
    })

    const result = await tasks.save();
    console.log(result);
    res.status(200).send('Task saved!');
})

// Change a list of tasks
router.patch("/", async (req, res) => {
    // Find a task
    const task = await Task.findById(req.body._id);
    // Find a list
    const list = await List.findById(req.body._id);

    // Check a error
    if (task === null) return res.status(400).send('Task not found.');
    if (list === null) return res.status(400).send('List not found.');

    // Set task to list by _listID
    db.tasks.update({
        task
    }, {
        $set: {
            _listID: list
        }
    })
    const saveTask = await task.save();
    console.log(saveTask);
    res.status(200).send('Change list completed.');
})

module.exports = router;