const corsMiddleware = function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
    next();
  };

  module.exports = corsMiddleware;