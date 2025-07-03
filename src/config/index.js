"use strict";

const defaultsValidator = require("./defaultsValidator");
const fullValidator = require("./validator");

// Clone env so we don't modify process.env directly
const env = { ...process.env };

// Step 1: Apply defaults
defaultsValidator(env);

// Step 2: Validate
if (!fullValidator(env)) {
  console.error(fullValidator.errors);
  process.exit(1);
}

module.exports = {
  postgresPassword: env.POSTGRES_PASSWORD,
  postgresDatabase: env.POSTGRES_DB,
  postgresHost: env.POSTGRES_HOST,
  postgresPort: env.POSTGRES_PORT,
  postgresUser: env.POSTGRES_USER,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  enableStackTrace: env.ENABLE_STACK_TRACE,
  serverLogging: env.SERVER_LOGGING,
  dbEnv: env.DB_ENV,
  enableCors: env.ENABLE_CORS,
};
