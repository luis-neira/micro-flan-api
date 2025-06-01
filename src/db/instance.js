"use strict";

const knex = require("knex");
const knexFile = require("../../knexfile");

function makeKnexInstance(nodeEnv = "development") {
  return knex(knexFile[nodeEnv]);
}

module.exports = makeKnexInstance;
