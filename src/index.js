const express = require("express");
const cors = require("cors");
const config = require("config");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);
require("./startup/prod")(app);

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