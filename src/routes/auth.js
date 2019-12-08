const mongoose = require('mongoose');
// const validator = require('validator'); ? const joi = require('joi'); ?
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {userSchema} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await userSchema.findOne({ login: req.body.login });
    if (!user) return res.status(400).send('Invalid login or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid login or password.');

    const token = user.generateAuthToken();
    res.send(token);
  });

  function validate (req) {
      const schema = {
          login: 
          password: 
      };

      return 
  }

  module.exports = router;