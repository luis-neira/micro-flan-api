"use strict";

const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
  const isDevEnv = process.env.NODE_ENV === "development";
  const { statusCode, message } = err;

  if (isDevEnv && statusCode >= 500) {
    req.log.error(err);
  }

  const response = {
    error: true,
    code: statusCode,
    message: message,
    ...(isDevEnv && { stack: err.stack }),
  };

  res.status(response.code);
  res.json(response);
};

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!createError.isHttpError(error)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong!";
    const stack = error.stack;

    error = createError(statusCode, message);
    if (stack) {
      error.stack = stack;
    }
  }

  next(error);
};

module.exports = {
  errorHandler,
  errorConverter,
};
