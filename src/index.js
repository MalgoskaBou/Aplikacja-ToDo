const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
const lists = require("./routes/lists");
const users = require("./routes/users");

// Module user
const users = require("./routes/users");

dotenv.config();
require("./db/db");

const port = process.env.PORT;

// Connection with server
mongoose.connect('mongodb://localhost:3000/api')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

const app = express();

// Middleware
app.use(cors());
app.use("/static", express.static("public"));

// Define rout for users
app.use('/api/users', users);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Launch server
app.listen(port, err => {
  if (err) { throw err; } else { console.log(`Server running on port: ${port}`); }});

// Routes
app.use("/api/tasks", tasks);
app.use("/api/lists", lists);
app.use("/api/users", users);

// In terminal type "npm start" to start nodemon

/*
POST      api/users     - register new user
POST      api/lists       - create new list (max 3 for each user)
POST      api/tasks     - add new task to list (max 5 in each list)
*/