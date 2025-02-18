const { createLogger, transports, format } = require("winston");
const LokiTransport = require("winston-loki");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, ...metadata }) => {
          return `[${level}]: ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`;
        })
      ),
    }),
    new LokiTransport({
      host: "http://127.0.0.1:3100",
      labels: { appName: "express" },
      json: true,
      format: format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => logger.error(err)
    })
  ]
});

module.exports = logger;