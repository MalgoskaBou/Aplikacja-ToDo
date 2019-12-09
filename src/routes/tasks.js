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