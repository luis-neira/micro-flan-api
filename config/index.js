"use strict";

const joi = require("joi");

const envVarSchema = joi
  .object({
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.number().positive().default(5432),
    POSTGRES_USER: joi.string().required(),
    NODE_ENV: joi
      .string()
      .valid("test", "development", "staging", "production"),
  })
  .unknown();

const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) {
  console.log(error);
}

module.exports = {
  postgresPassword: envVars.POSTGRES_PASSWORD,
  postgresDatabase: envVars.POSTGRES_DB,
  postgresHost: envVars.POSTGRES_HOST,
  postgresPort: envVars.POSTGRES_PORT,
  postgresUser: envVars.POSTGRES_USER,
  nodeEnv: envVars.NODE_ENV,
};
