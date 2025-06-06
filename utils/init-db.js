"use strict";

const knex = require("knex");
const knexFile = require("../knexfile");
const config = require("../config");

const db = knex(knexFile[config.nodeEnv]);

// Re-run knex with fresh migrations/seeds
db.migrate
  .latest()
  .then(() => db.destroy())
  .then(() => {
    console.log("Data successfully imported to rentals.db");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
