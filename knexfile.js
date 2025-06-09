"use strict";

// Update with your config settings.
const os = require("os");
const config = require("./src/config");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: "better-sqlite3",
    connection: {
      filename: ":memory:",
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
      host: config.postgresHost,
      port: config.postgresPort,
      user: config.postgresUser,
      database: config.postgresDatabase,
      password: config.postgresPassword,
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
    client: "pg",
    connection: {
      host: config.postgresHost,
      port: config.postgresPort,
      user: config.postgresUser,
      database: config.postgresDatabase,
      password: config.postgresPassword,
    },
    pool: { min: 2, max: os.cpus().length },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: config.postgresHost,
      port: config.postgresPort,
      user: config.postgresUser,
      database: config.postgresDatabase,
      password: config.postgresPassword,
    },
    pool: { min: 2, max: os.cpus().length },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
