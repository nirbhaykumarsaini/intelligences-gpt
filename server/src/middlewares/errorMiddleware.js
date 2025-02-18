const logger = require("../config/winston"); 

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error details
  const errorLog = {
    method: req.method,
    url: req.originalUrl,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  logger.error(JSON.stringify(errorLog));

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
