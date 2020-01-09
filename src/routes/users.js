const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");

router.get("/me", auth, async (req, res) => {
	// Returns information about the user
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).send(user);
	} catch (err) {
        res.status(500).send(err.message);
	}
});

router.post('/', async (req, res) => {
	  // Register new user
	  try {
		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send("That user already exists!");

		const {error} = validateUser(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		user = new User(_.pick(req.body, ["login", "email", "password"]));
		await user.save();

		const token = user.generateAuthToken();
		res
		.status(201)
		.header("x-auth-token", token)
		.send(_.pick(user, ["_id", "login", "email"]));
	} catch (err) {
        res.status(500).send(err.message);
	}
});

module.exports = router;
