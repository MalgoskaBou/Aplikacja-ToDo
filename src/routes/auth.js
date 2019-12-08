const mongoose = require('mongoose');
// const validator = require('validator'); ? const joi = require('joi'); ?
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {userSchema} = require('../models/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();