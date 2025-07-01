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
    NODE_ENV: { type: "string" },
  },
  required: [
    "POSTGRES_PASSWORD",
    "POSTGRES_DB",
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_USER",
    "PORT",
    "JWT_SECRET",
    "NODE_ENV",
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
  nodeEnv: env.NODE_ENV,
};
