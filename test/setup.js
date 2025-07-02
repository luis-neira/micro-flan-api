"use strict";

const path = require("node:path");
const fs = require("node:fs");

const dotenv = require("dotenv");
const envPath = path.resolve(__dirname, "..", ".env.test");
dotenv.config({ path: envPath });

const getContainer = require("../src/ioc-container");

const location = path.join(__dirname, "..", "tmp", "test.db");

before(async () => {
  const dirName = require('path').dirname(location);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  // Re-run knex with fresh migrations/seeds
  const awilixContainer = getContainer();
  const knex = awilixContainer.resolve("db");
  await knex.migrate.latest();

  // await knex.seed.run();
  return;
});

after(async function () {
  if (fs.existsSync(location)) {
    fs.unlinkSync(location);
  }
  
  const awilixContainer = getContainer();
  // Destroy knex connection
  await awilixContainer.dispose();
  // await knex.destroy();
  return;
});
