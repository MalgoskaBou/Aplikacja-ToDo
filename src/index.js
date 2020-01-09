const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);

// Launch server
const server = app.listen(port, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running on port: ${port}`);
  }
});

module.exports = server;

// In terminal type "npm start" to start nodemon

/*
POST      api/users     - register new user
POST      api/lists       - create new list (max 3 for each user)
POST      api/tasks     - add new task to list (max 15 for each user in general)

DELETE      api/tasks/:id     - delete task from list
DELETE      api/lists/:id       - delete list with all contained task
*/

// why its here?
// // Define rout for tasks page
// app.get('/tasks/completed', tasks.checked);
// app.post('/tasks/:task_id', tasks.addToList);
// app.post('/tasks/:task_id', tasks.markChecked);
// app.post('/tasks/:task_id', tasks.markUnchecked);