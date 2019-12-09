// HTTP POST /users — Register user (create a new one)
// HTTP POST /users/login — Allow users to login
// HTTP GET / users/me — Get user profile
// HTTP POST /users/logout — Logout the user on one device
// HTTP POST /users/logoutall — Logout from all devices

const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    //const token = await user.generateAuthToken();
    res.status(201).send({ user /*token*/ });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  //Login a registered user
  try {
    const { login, password } = req.body;
    const user = await User.findByCredentials(login, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Wrong login or password." });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
