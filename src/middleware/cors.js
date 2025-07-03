"use strict";

const cors = require("cors");
const createError = require("http-errors");

const whitelist = ["http://example1.com"];

module.exports = (config) =>
  cors({
    origin:
      config.enableCors === "true"
        ? (origin, callback) => {
            if (whitelist.includes(origin)) {
              callback(null, true);
            } else {
              callback(createError.Forbidden("Not allowed by CORS"));
            }
          }
        : "*",
  });
