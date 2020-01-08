const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth');

const Task = require('../models/task');
const List = require('../models/list');
const User = require('../models/user');

router.get(
    '/',
    /*[auth],*/ async (req, res) => {
        // TODO: ObjectId validation
        try {
            const queryObj = req.query;

            if (queryObj.user) {
                const user = await User.findById(queryObj.user);
                let tasks;
                if (!user) {
                    return res.status(400).send('User not found.');
                } else {
                    if (queryObj.list && queryObj.checked) {
                        // /tasks?user=5df1ba13a325462fdc2e2558&list=5df2685e04f77f2aa48d2ddd&checked=false
                        tasks = await Task.find({
                            _userID: queryObj.user,
                            _listID: queryObj.list,
                            checked: queryObj.checked,
                        }).select('-__v');
                    } else if (queryObj.list) {
                        // /tasks?user=5df1ba13a325462fdc2e2558&list=5df2685e04f77f2aa48d2ddd
                        tasks = await Task.find({
                            _userID: queryObj.user,
                            _listID: queryObj.list,
                        }).select('-__v');
                    } else if (queryObj.checked) {
                        // /tasks?user=5df1ba13a325462fdc2e2558&checked=true
                        // /tasks?user=5df1ba13a325462fdc2e2558&checked=false
                        tasks = await Task.find({
                            _userID: queryObj.user,
                            checked: queryObj.checked,
                        }).select('-__v');
                    } else {
                        // /tasks?user=5df1ba13a325462fdc2e2558
                        tasks = await Task.find({
                            _userID: queryObj.user,
                        }).select('-__v');
                    }
                    res.status(200).send(tasks);
                }
            } else {
                // /tasks?userrr=5df1ba13a325462fdc2e2558
                // /tasks/
                // etc
                res.status(400).send('Invalid endpoint.');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
);

router.post('/', auth, async (req, res) => {
    // Add task to given list
    try {
        // Check if given user exist
        const user = await User.findById(req.body.userID);
        // If not send 400 status
        if (!user) return res.status(400).send('User not found.');
        // Check if given list exist
        const list = await List.findOne(
            { _userID: req.body.userID },
            { _listID: req.body.listID }
        );
        // If not send 400 status
        if (!list) return res.status(400).send('User not found.');
        // Check if user reached tasks amount limit
        const savedTasks = await Task.find({ _userID: req.body.userID });
        if (savedTasks.length == 15)
            return res
                .status(400)
                .send('The user has reached tasks amount limit (max 15).');
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
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    // Remove task from tasks collection
    try {
        const taskID = req.params.id;
        // Search for the task
        const task = await Task.findById(taskID);
        // If it doesn't exist send 400 status
        if (!task) return res.status(400).send('Task not found.');
        // Remove the task
        await Task.deleteOne({ _id: taskID });
        // Send 200 status
        res.status(200).send('Task is successfully removed.');
    } catch (error) {
        // Catch error and send response
        res.status(500).send(error.message);
    }
});

module.exports = router;

/*
// Add checked tasks to the 'Checked' List
exports.checked = function (req, res, next) {
    req.db.tasks.find({
        checked: true
    }).toArray(function (error, tasks) {
        res.render('tasks_checked', {
            title: 'Checked',
            tasks: tasks || []
        });
    });
};


// Add task to the certain list
exports.addToList = function (req, res, next) {
    req.db.tasks.find({
        list_id: list_id
    }).toArray(function (error, tasks) {
        res.render('add_to_certain_list', {
            list_name: `${listTitle}`,
            lists: lists || []
        });
    });
};

// Mark a single task as done // checked
exports.markChecked = function (req, res, next) {
    if (!req.body.checked) return next(new Error('Param is missing'));
    const checked = req.body.checked === 'true';
    req.db.tasks.updateById(req.task._id, {
        $set: {
            checked: checked
        }
    }, function (error, count) {
        if (error) return next(error);
        if (count !== 1) return next(new Error('Something went wrong.'));
        res.redirect('/tasks');
    })
};

// Mark a single task as not done // unchecked
exports.markUnchecked = function (req, res, next) {
    if (!req.body.checked) return next(new Error('Param is missing'));
    const unchecked = req.body.checked === 'false';
    req.db.tasks.updateById(req.task._id, {
        $set: {
            checked: unchecked
        }
    }, function (error, count) {
        if (error) return next(error);
        if (count !== 1) return next(new Error('Something went wrong.'));
        res.redirect('/tasks');
    })
};
*/
