const User = require("../models/user");
const auth = require("../middleware/auth");
const jwt = require('jsonwebtoken');
const config = require('config');
// const auth = require("../middleware/auth");
// const { User, validateUser } = require("../models/user");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  });
router.post("/", async (req, res) => {
  
  // Register new user

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
*/
  /* To zwraca błąd "validate is not defined" 
  edit: nie ma jeszcze validacji na dev, więc nie sprawdzę czy działa ;) */
  // const {error} = validateUser(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ login: req.body.login });
  if (user) return res.status(400).send("That user already exists!");

  await user.save();
  res.status(201).send("User successfully added.");

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'login']));

});

module.exports = router;
