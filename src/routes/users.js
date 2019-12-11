// Add user to database 
const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ login: req.body.login });
    if (user) return res.status(400).send('That user already exists!');

    user = new User({
        login: req.body.login,
        password: req.body.password
    });
    await user.save();
    res.send(user);
});

module.exports = router;