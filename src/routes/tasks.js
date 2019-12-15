const Task = require("../models/task");
const List = require("../models/list");
const User = require("../models/user");
// const auth = require("../middleware/auth");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/",/*[auth],*/ async (req, res) => {
    try {
        const queryObj = req.query;

        if (queryObj.user) {
            const user = await User.findById(queryObj.user);
            if (!user) {
                return res.status(400).send("User not found.");
            } else {
                if (queryObj.list && queryObj.checked) {
                    // /tasks?user=5df1ba13a325462fdc2e2558&list=5df2685e04f77f2aa48d2ddd&checked=false
                    const tasks = await Task.find({_userID: queryObj.user, _listID: queryObj.list, checked: queryObj.checked}).select("-__v");
                    res.status(200).send(tasks);
                } else if (queryObj.list) {
                    // /tasks?user=5df1ba13a325462fdc2e2558&list=5df2685e04f77f2aa48d2ddd
                    const tasks = await Task.find({_userID: queryObj.user, _listID: queryObj.list}).select("-__v");
                    res.status(200).send(tasks);
                } else if (queryObj.checked) {
                    // /tasks?user=5df1ba13a325462fdc2e2558&checked=true
                    // /tasks?user=5df1ba13a325462fdc2e2558&checked=false
                    const tasks = await Task.find({_userID: queryObj.user, checked: queryObj.checked}).select("-__v");
                    res.status(200).send(tasks);
                } else {
                    // /tasks?user=5df1ba13a325462fdc2e2558
                    const tasks = await Task.find({ _userID: queryObj.user }).select("-__v");
                    res.status(200).send(tasks);
                }
            }
        } else {
            // /tasks/
            // /tasks?userrr=5df1ba13a325462fdc2e2558
            // etc
            res.status(400).send("Invalid endpoint.");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
  }
);

// router.get("/",/*[auth],*/ async (req, res) => {
//     // Return users tasks
//     const tasks = await Task.find({ _userID: req.body.user }).select("-__v");
//     res.send(tasks);
//   }
// );

router.post("/",/*[auth],*/ async (req, res) => {
    // Add task to given list
    try {
      // Check if given user exist
      const user = await User.findById(req.body.userID);
      // If not send 400 status
      if (!user) return res.status(400).send("User not found.");
      // Check if given list exist
      const list = await List.findOne({ _userID: req.body.userID },{ _listID: req.body.listID });
      // If not send 400 status
      if (!list) return res.status(400).send("User not found.");
      // Check if user reached tasks amount limit
      const savedTasks = await Task.find({ _userID: req.body.userID });
      if (savedTasks.length == 15)
        return res
          .status(400)
          .send("The user has reached tasks amount limit (max 15).");
      // Create new task and save it to db
      const task = new Task({
        _userID: req.body.userID,
        _listID: req.body.listID,
        name: req.body.name
      });
      await task.save();
      // Send new task as a response
      res.status(201).send(task);
    } catch (error) {
      // WHAT STATUS CODE SHOULD BE USED?
      res.status(500).send(error.message);
    }
  }
);

router.delete("/:id", async (req, res) => {
  // Remove task from tasks collection
  try {
    const taskID = req.params.id;
    // Search for the task
    const task = await Task.findById(taskID);
    // If it doesn't exist send 400 status
    if (!task) return res.status(400).send("Task not found.");
    // Remove the task
    await Task.deleteOne({ _id: taskID });
    // Send 200 status
    res.status(200).send("Task is successfully removed.");
  } catch (error) {
    // Catch error and send response
    res.status(400).send(error.message);
  }
});

module.exports = router;
