"use strict";

const Ajv = require("ajv")
const ajv = new Ajv({ useDefaults: true })

const schema = {
  type: "object",
  properties: {
    POSTGRES_PASSWORD: { type: "string" },
    POSTGRES_DB: { type: "string" },
    POSTGRES_HOST: { type: "string" },
    POSTGRES_PORT: { type: "string", default: "5432" },
    POSTGRES_USER: { type: "string" },
    PORT: { type: "string", default: "3000" },
    JWT_SECRET: { type: "string" },
    ENABLE_STACK_TRACE: { type: "string" },
    SERVER_LOGGING: { type: "string" },
    DB_ENV: { type: "string" },
    ENABLE_CORS: { type: "string" },
  },
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
  additionalProperties: true
}

const validate = ajv.compile(schema)

const env = { ...process.env };

const isValid = validate(env)
if (!isValid) {
  console.log(validate.errors);
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
