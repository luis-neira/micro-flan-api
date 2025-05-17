"use strict";

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(createError(401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403));
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
