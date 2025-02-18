const logger = require("../config/winston");

// utils/errorHandler.js
module.exports = function () {
    process.on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
        logger.error('🔥 Uncaught Exception:', error);
        process.exit(1); 
    });
};
