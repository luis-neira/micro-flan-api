"use strict";

const knex = require("knex");
const getKnexfile = require("../../knexfile");
const config = require("../config");

function makeKnexInstance(dbEnv = "development") {
  const knexfile = getKnexfile(config);
  return knex(knexfile[dbEnv]);
}

module.exports = makeKnexInstance;
