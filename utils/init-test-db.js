"use strict";

// const fs = require("node:fs");
// const path = require("node:path");

const knex = require("knex");
const knexFile = require("../knexfile");
const config = require("../config");

const db = knex(knexFile[config.nodeEnv]);

// const dbPath = path.resolve("rentals.db");

// if (fs.existsSync(dbPath)) {
//   fs.unlinkSync(dbPath);
// }

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
