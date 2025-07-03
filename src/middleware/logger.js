"use strict";

const logger = require("pino-http");

module.exports = (config) => {
    if (config.enableServerLogging === "false") {
        return (req, res, next) => next(); 
    }

    return logger();
};
