"use strict";

// const fs = require("node:fs");
// const path = require("node:path");

const knexFile = require("../knexfile");
const knex = require("knex")(knexFile[process.env.NODE_ENV]);

const db = knex(knexFile[process.env.NODE_ENV]);

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
