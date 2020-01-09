const corsMiddleware = require("../middleware/cors");
const auth = require("../routes/auth");
const tasks = require("../routes/tasks");
const lists = require("../routes/lists");
const users = require("../routes/users");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(corsMiddleware);
  app.use("/api/tasks", tasks);
  app.use("/api/lists", lists);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};