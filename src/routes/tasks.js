const auth = require("../middleware/auth");
const Task = require("../models/task");
const List = require("../models/list");
// const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await Task.find()
        .select("-__v");
    res.send(tasks)
})

router.post("/", auth, async (req, res) => {
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

module.exports = router;