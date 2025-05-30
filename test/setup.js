const knex = require("../db/instance");

before(async () => {
  // Re-run knex with fresh migrations/seeds
  await knex.migrate.latest();
  // await knex.seed.run();
  return;
});

after(async function () {
  // Destroy knex connection
  await knex.destroy();
  return;
});
