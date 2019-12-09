const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
require('./db/db');

dotenv.config();

// Connection with server
mongoose.connect('mongodb://localhost:3000/api')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

const app = express();
const router = express.Router();

// Module tasks
const tasks = require("./routes/tasks");

// Middleware 
// not sure if the order is correct
app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));
// Urlencoded will allow us to extract the data from the form by adding her to the body property of the request
app.use(express.urlencoded({
    extended: true
}));

// Define rout for tasks page
app.get('/tasks/completed', tasks.checked);
app.post('/tasks/:task_id', tasks.addToList);
app.post('/tasks/:task_id', tasks.markChecked);
app.post('/tasks/:task_id', tasks.markUnchecked);

// Launch server
const port = process.env.PORT || 3000;
app.listen(port, err => {
    if (err) {
        throw err;
    } else {
        console.log(`Server running on port: ${port}`)
    }
});


// POST METHOD
app.post('/', (req, res) => {
    console.log(req.body);
});

// In terminal type "npm start" to start nodemon