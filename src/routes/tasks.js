const Task = require("../models/task");
const List = require("../models/list");
// const auth = require("../middleware/auth");
const express = require("express");
const _ = require("lodash");
const router = express.Router();


router.get("/", async (req, res) => {
    const tasks = await Task.find()
        .select("-__v");
    res.send(tasks)
})

router.post("/", /*[auth],*/ async (req, res) => {
    // Add task to given list
    try {
        // Check if given list exist
        const list = await List.findById(req.body.listID);
        // If not send 400 status
        if (!list) return res.status(400).send("List not found.");
        // If yes check if list is filled
        if (list.tasks.length == 5) return res.status(400).send("The list is filled.");
        // If not create new task and save it to db
        const task = new Task({
            _list: list._id,
            name: req.body.name,
        });
        await task.save();
        // Add task to array in given list and save updated list
        list.tasks.push(task);
        await list.save();
        // Send new task as a response    
        res.status(201).send(task);
    } catch (error) {
        // Catch error and send response
        res.status(400).send(error.message);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const taskID = req.params.id;
        console.log(taskID);
        // Search for a task to remove in task collection
        const task = await Task.findById(taskID);
        console.log(task);
        // If it doesn't exist send 400 status
        if (!task) return res.status(400).send("Task not found.");
        // Search for List that contains the task
        const list = await List.findById(task._list);
        console.log(list);
        // Get task array and remove the task
        await _.pull(list.tasks, task._id);
        await list.save();
        // Now remove the task from tasks collection
        await Task.deleteOne({_id: taskID});
        // Send 200 status
        res.status(200).send("Task is successfully removed.");
    } catch (error) {
        // Catch error and send response
        console.log(error);
        res.status(400).send(error.message);
    }
})

module.exports = router;