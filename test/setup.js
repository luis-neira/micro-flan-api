const fs = require("node:fs");
const path = require("node:path");
const knex = require("../db/instance");

const dbPath = path.resolve("test.db");

before(async () => {
  // Delete test DB if it exists
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  // Re-run knex with fresh migrations/seeds
  await knex.migrate.latest();
  await knex.seed.run();
});

after(async () => {
  // Destroy knex connection
  await knex.destroy();

  // Clean up the test DB file
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }
});
