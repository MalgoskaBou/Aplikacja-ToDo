const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');
// Import database setup
require('./db/db');
// Import routes
const users = require("../routes/users");
const lists = require("../routes/lists");
const tasks = require("../routes/tasks");
const auth = require("../routes/auth");

dotenv.config();
const port = process.env.PORT;
const app = express();
const router = express.Router();

// Middleware 
app.use(cors());
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', users);
app.use('/api', lists);
app.use('/api', tasks);
app.use('/api', auth);

// Launch server
app.listen(port, err => {
    if (err) {throw err;} else {console.log(`Server running on port: ${port}`)}
});


// POST METHOD
app.post('/', (req, res) => {
    console.log(req.body);
});

// In terminal type "npm start" to start nodemon