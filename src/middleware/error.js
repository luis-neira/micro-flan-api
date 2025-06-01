"use strict";

module.exports = (err, req, res, next) => {
  const isDevEnv = process.env.NODE_ENV === "development";
  const { statusCode, message } = err;

  if (isDevEnv && (statusCode >= 500 || !statusCode)) {
    req.log.error(err);
  }

  const response = {
    error: true,
    code: statusCode || 500,
    message: message || "Something went wrong!",
    ...(isDevEnv && { stack: err.stack }),
  };

  res.status(response.code);
  res.json(response);
};
