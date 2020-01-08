const config = require("config");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
const lists = require("./routes/lists");
const users = require("./routes/users");
const port = process.env.PORT;

const auth = require("./routes/auth");
if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}


dotenv.config();
require("./db/db");

// Connection with db
// mongoose.connect(process.env.DB_CONNECT)
//   .then(() => console.log('Connected to database.'))
//   .catch(err => console.error('Something went wrong...', err));

// Server
const app = express();

// Middleware
app.use(cors());
app.use("/static", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
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
    console.log(`Server running on port: ${port}`);
  }
});

// Routes
app.use("/api/tasks", tasks);
app.use("/api/lists", lists);
app.use("/api/users", users);
app.use("/api/auth", auth);

// In terminal type "npm start" to start nodemon

/*
POST      api/users     - register new user
POST      api/lists       - create new list (max 3 for each user)
POST      api/tasks     - add new task to list (max 15 for each user in general)

DELETE      api/tasks/:id     - delete task from list
DELETE      api/lists/:id       - delete list with all contained task
*/