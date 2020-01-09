const express = require("express");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");

const {Task, validateTask} = require("../models/task");
const {List} = require("../models/list");
const {User} = require("../models/user");

router.get("/", auth, async (req, res) => {
    // Return tasks of the given user based on specific parameters
    try {
        const queryObj = req.query;
        if (queryObj.user) {
            const user = await User.findById(queryObj.user);
            let tasks;
            if (!user) {
                return res.status(400).send("User not found.");
            } else {
                if (queryObj.list && queryObj.checked) {
                    // /tasks?user=<userId>&list=<listId>&checked=<true/false>
                    tasks = await Task.find({_userID: queryObj.user, _listID: queryObj.list, checked: queryObj.checked}).select("-__v");
                } else if (queryObj.list) {
                    // /tasks?user=<userId>&list=<listId>
                    tasks = await Task.find({_userID: queryObj.user, _listID: queryObj.list}).select("-__v");
                } else if (queryObj.checked) {
                    // /tasks?user=<userId>&checked=<true/false>
                    tasks = await Task.find({_userID: queryObj.user, checked: queryObj.checked}).select("-__v");
                } else {
                    // /tasks?user=<userId>
                    tasks = await Task.find({ _userID: queryObj.user }).select("-__v");
                }
                res.status(200).send(tasks);
            }
        } else {
            // /tasks?userrr=5df1ba13a325462fdc2e2558
            // /tasks?checked=true
            // etc
            res.status(400).send("Invalid endpoint.");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/", auth, async (req, res) => {
    // Add task to given list
    try {
        const user = await User.findById(req.body.userID);
        if (!user) return res.status(400).send("User not found.");

        const list = await List.findOne({$and: [{ _userID: req.body.userID}, {_id: req.body.listID }]});
        if (!list) return res.status(400).send("List not found.");

        const savedTasks = await Task.find({ _userID: req.body.userID });
        if (savedTasks.length >= 15) return res.status(400).send("The user has reached the limit (max 15 tasks per user).");
		
		const { error } = validateTask(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const task = new Task({
        	_userID: req.body.userID,
        	_listID: req.body.listID,
        	name: req.body.name
        });
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
  // Remove task from tasks collection
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(400).send("Task not found.");
        if (task._userID != req.body.userID) return res.status(400).send("Task not found.");

    	await Task.deleteOne({ _id: req.params.id });
    	res.status(200).send("Task is successfully removed.");
    } catch (error) {
    	res.status(400).send(error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
	// Mark a single task as checked /unchecked
	try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(400).send("Task not found.");
        if (task._userID != req.body.userID) return res.status(400).send("Task not found.");
	
		task.checked = !task.checked;
		await task.save();
	    res.status(200).send(task);
	} catch (error) {
    	res.status(400).send(error.message);
    }
});

router.patch("/:id/move_to/:listID", auth, async (req, res) => {
	// Move the task to another list
	try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(400).send("Task not found.");
		if (task._userID != req.body.userID) return res.status(400).send("Task not found.");

		const list = await List.findById(req.params.listID);
		if (!list) return res.status(400).send("List not found.");
		if (list._userID !=req.body.userID) return res.status(400).send("List not found.");

		if (task._listID === list._id) return res.status(400).send("The task is already in the given list.");
		
		task._listID = list.id;
		await task.save();
	    res.status(200).send(task);
	} catch (error) {
    	res.status(400).send(error.message);
    }
});


module.exports = router;