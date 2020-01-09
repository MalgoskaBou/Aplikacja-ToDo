const auth = require("../middleware/auth");
const {User} = require("../models/user");
const {List, validateList} = require("../models/list");
const {Task} = require("../models/task");
const express = require("express");
const router = express.Router();

router.get("/", [auth], async (req, res) => {
    // Return all lists belonging to the given users
    try {
        const user = await User.find({"_userID": req.body.userID});
        if (!user) return  res.status(400).send("User not found.");

        const lists = await List.find({"_userID": req.body.userID}).select("-__v");
        res.send(lists);
    } catch (error) {
        // WHAT STATUS CODE SHOULD BE USED?
        res.status(400).send(error.message);
    }
})

router.post("/", auth, async (req, res) => {
    // Add new list to user
    try {
        const user = await User.find({"_userID": req.body.userID});
        if (!user) return  res.status(400).send("User not found.");

        const savedLists = await List.find({"_userID": req.body.userID});
        if (savedLists.length >= 3) return res.status(400).send("The user has reached the limit (max 3 list per user).");

        const { error } = validateList(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const list = new List({
            _userID: req.body.userID,
            name: req.body.name,
        });
        await list.save();
        res.status(201).send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete("/:id", auth, async (req, res) => {
    // Remove the list and all tasks from that list
    try {
        const user = await User.find({"_userID": req.body.userID});
        if (!user) return  res.status(400).send("User not found.");

        const list = await List.findById(req.params.id);
        if (!list) return res.status(400).send("List not found.");
        if (list._userID != req.body.userID) return res.status(400).send("List not found.");

        await List.deleteOne({_id: req.params.id});
        await Task.deleteMany({_listID: req.params.id});
        res.status(200).send("List is successfully removed.");
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.patch("/:id", auth, async (req, res) => {
    // Change name of the list
    try {
        const list = await List.findById(req.params.id);
        if (!list) return res.status(400).send("List not found.");
        if (list._userID != req.body.userID) return res.status(400).send("List not found.");

        const { error } = validateList(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        list.name = req.body.name;
        res.status(200).send(await list.save());
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;