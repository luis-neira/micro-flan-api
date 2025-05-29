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
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      database: "postgres",
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: { min: 2, max: os.cpus().length },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
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
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
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
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
