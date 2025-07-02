"use strict";

const Ajv = require("ajv");

// Step 1: apply defaults
const ajvWithDefaults = new Ajv({ useDefaults: true });

const defaultSchema = {
  type: "object",
  properties: {
    POSTGRES_PORT: { type: "string", default: "5432" },
    PORT: { type: "string", default: "3000" },
    // Add other defaultable properties if needed
  },
  additionalProperties: true,
};

const defaultsValidator = ajvWithDefaults.compile(defaultSchema);

// Step 2: full validation schema with conditional logic
const ajvStrict = new Ajv(); // no `useDefaults` here — we've already applied them

const fullSchema = {
  type: "object",
  properties: {
    POSTGRES_PASSWORD: { type: "string" },
    POSTGRES_DB: { type: "string" },
    POSTGRES_HOST: { type: "string" },
    POSTGRES_PORT: { type: "string" },
    POSTGRES_USER: { type: "string" },
    PORT: { type: "string" },
    JWT_SECRET: { type: "string" },
    ENABLE_STACK_TRACE: { type: "string" },
    SERVER_LOGGING: { type: "string" },
    DB_ENV: { type: "string" },
    ENABLE_CORS: { type: "string" },
  },
  required: ["DB_ENV"],
  if: {
    properties: {
      DB_ENV: { const: "test" },
    },
  },
  then: {
    required: ["SERVER_LOGGING"],
  },
  else: {
    required: [
      "POSTGRES_PASSWORD",
      "POSTGRES_DB",
      "POSTGRES_HOST",
      "POSTGRES_PORT",
      "POSTGRES_USER",
      "PORT",
      "JWT_SECRET",
      "ENABLE_STACK_TRACE",
      "SERVER_LOGGING",
      "DB_ENV",
      "ENABLE_CORS",
    ],
  },
  additionalProperties: true,
};

const fullValidator = ajvStrict.compile(fullSchema);

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
  sererLogging: env.SERVER_LOGGING,
  dbEnv: env.DB_ENV,
  enableCors: env.ENABLE_CORS,
};
