// Update with your config settings.
const os = require("os");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: "better-sqlite3",
    connection: {
      filename: "test.db",
    },
    useNullAsDefault: true,
    pool: { min: 2, max: os.cpus().length },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./rentals.db",
    },
    useNullAsDefault: true,
    pool: { min: 2, max: os.cpus().length },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  staging: {
    client: "better-sqlite3",
    connection: {
      filename: "./rentals.db",
    },
    useNullAsDefault: true,
    pool: { min: 2, max: os.cpus().length },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "better-sqlite3",
    connection: {
      filename: "./rentals.db",
    },
    useNullAsDefault: true,
    pool: { min: 2, max: os.cpus().length },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
