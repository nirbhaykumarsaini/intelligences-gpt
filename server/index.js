const express = require("express");
const cluster = require("cluster");
const os = require("os");
const dbConnect = require("./src/config/db");
require("dotenv").config();
const authRouter = require("./src/routes/auth");
const chatRouter = require("./src/routes/chat");
const metricsRouter = require("./src/routes/metrics");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorMiddleware");
const responseTime = require("response-time");
const logger = require("./src/config/winston");
const { requestLogger } = require("./src/middlewares/loggerMiddleware");
const { metricsMiddleware } = require("./src/middlewares/metricsMiddlware");
require('./src/utils/errorHandler')();

const PORT = process.env.PORT || 8000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  logger.info(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on("exit", (worker, code, signal) => {
    logger.warn(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/", authRouter);
  app.use("/", chatRouter);
  app.use("/", metricsRouter);
  

  app.use(requestLogger);
  app.use(responseTime(metricsMiddleware));
  app.use(errorHandler);

  dbConnect()
    .then(() => {
      logger.info("Database connected successfully");
      app.listen(PORT, () => {
        logger.info(`Worker ${process.pid} running on port ${PORT}`);
      });
    })
    .catch(error => {
      logger.error("Database connection failed:", error);
      process.exit(1);
    });
}
