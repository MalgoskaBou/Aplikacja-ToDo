const Joi = require("@hapi/joi");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validateUser} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        login: req.body.login });
    if (!user) return res.status(400).send('Invalid login or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid login or password.');
   
    const token = user.generateAuthToken();
    res.send(token);
  });

  function validate (req) {
      const schema = Joi.object ({
          login: Joi.string()
          .min(3)
          .max(30)
          .required()
          .login(),
          password: Joi.string()
          .min(5)
          .max(1024)
          .required()
      });
      return schema.validate(req);
  }

  module.exports = router;