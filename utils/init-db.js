"use strict";

const fs = require("node:fs");
const path = require("node:path");
const knex = require("../db/instance");

const dbPath = path.resolve("rentals.db");

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

// Re-run knex with fresh migrations/seeds
knex.migrate
  .latest()
  .then(() => {
    return knex.seed.run();
  })
  .then(() => knex.destroy())
  .then(() => {
    console.log("Data successfully imported to rentals.db");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
