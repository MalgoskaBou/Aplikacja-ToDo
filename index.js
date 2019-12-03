const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log("Connected to db!");

    app.listen(3000, () => console.log("Server Up and running"));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


// In terminal type "npm start" to start nodemon