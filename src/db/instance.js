"use strict";

const knex = require("knex");
const knexFile = require("../../knexfile");

function makeKnexInstance(dbEnv = "development") {
  return knex(knexFile[dbEnv]);
}

module.exports = makeKnexInstance;
