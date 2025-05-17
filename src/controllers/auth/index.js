"use strict";

const login = require("./login");

function createAuthController() {
  return {
    login: login(),
  };
}

module.exports = createAuthController;
