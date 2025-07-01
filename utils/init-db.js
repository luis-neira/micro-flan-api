"use strict";

const knex = require("knex");
const knexFile = require("../knexfile");
const config = require("../src/config");

const db = knex(knexFile[config.dbEnv]);

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
