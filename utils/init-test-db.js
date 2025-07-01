"use strict";

const knex = require("knex");
const knexFile = require("../knexfile");

const db = knex(knexFile["test"]);

// Re-run knex with fresh migrations/seeds
db.migrate
  .latest()
  .then(() => {
    return db.seed.run();
  })
  .then(() => db.destroy())
  .then(() => {
    console.log("Data successfully imported to rentals.db");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
