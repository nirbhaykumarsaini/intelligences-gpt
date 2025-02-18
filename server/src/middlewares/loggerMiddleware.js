const morgan = require("morgan");
const logger = require("../config/winston");

const morganFormat = ":method :url :status :response-time";

const requestLogger = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const [method, url, status, responseTime] = message.split(" ");
      logger.info("HTTP Request", {
        method,
        url,
        status: parseInt(status),
        responseTime: parseFloat(responseTime),
      });
    },
  },
});

module.exports = { requestLogger };
