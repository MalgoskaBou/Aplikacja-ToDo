const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);
require("./startup/prod")(app);

app.use(express.static(__dirname.replace("src", "") + "public"));

app.get("/", (req, res) => {
  const targetUrl = '/api';
  res.redirect(targetUrl);
});

app.get("/api", (req, res) => {
  res.sendFile(__dirname.replace("src", "") + "public/docs.html");
});

const server = app.listen(port, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running on port: ${port}`);
  }
});

module.exports = server;