const express = require("express");
const User = require("../models/user");
const _ = require("lodash");
const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new user
  try {
    const user = new User(_.pick(req.body, ["login", "password"])); 
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;