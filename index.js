const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Connection to database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log("Connected to db!");

    app.listen(3000, () => console.log("Server Up and running"));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Urlencoded will allow us to extract the data from the form by adding her to the body property of the request
app.use(express.urlencoded({ extended: true }));

// POST METHOD
app.post('/',(req, res) => {
    console.log(req.body);
});

// In terminal type "npm start" to start nodemon