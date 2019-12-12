// const jwt = require("jsonwebtoken");
// const config = require("config");
const User = require("../models/user");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post('/', async (req, res) => {
    // Register new user

/* To zwraca błąd "validate is not defined"  ;)
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
*/

    let user = await User.findOne({ "login": req.body.login });
    if (user) return res.status(400).send("That user already exists!");
    user = new User(_.pick(req.body, ["login", "password"]));

/* To jest niepotrzebne bo w modelu usera jest dodana funkcja "pre-save" która z automatu hashuje przed zapisaniem
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
*/
    await user.save();

/* To chyba nie zadziała bo w modelu usera na devie nie ma takiej funkcji
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'login']));
*/

});

module.exports = router;