"use strict";

const cors = require("cors");
const createError = require("http-errors");

const config = require("../config");

const whitelist = ["http://example1.com"];

module.exports = () =>
  cors({
    origin:
      config.enableCors === "production"
        ? (origin, callback) => {
            if (whitelist.includes(origin)) {
              callback(null, true);
            } else {
              callback(createError.Forbidden("Not allowed by CORS"));
            }
          }
        : "*",
  });
