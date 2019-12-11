// Add user to database 
const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate the request
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if this user already exists
    let user = await User.findOne({ login: req.body.login });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {
    // Insert the new user if they do not exist yet
    user = new User({
        login: req.body.login,
        password: req.body.password
    });
        await user.save();
        res.send(user);
    }
});

module.exports = router;