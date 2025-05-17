"use strict";

const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const USERS = [{ id: 1, username: "admin", password: "password123" }];

function loginUser() {
  return (req, res, next) => {
    const { username, password } = req.body;

    const user = USERS.find((u) => {
      return u.username === username && u.password === password;
    });

    if (!user) {
      return next(createError(401, "Invalid credentials"));
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  };
}

module.exports = loginUser;
