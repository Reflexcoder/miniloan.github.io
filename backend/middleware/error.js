const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  //This called a middleware
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong MOngodb Erro (Important)
  if (err.name === "CastError") {
    const message = `Resource Not Found ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: true,
    message: err.message, // we can also use .slack (try this and see what happening....)
  });
};
