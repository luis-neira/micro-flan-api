"use strict";

const joi = require("joi");

const envVarSchema = joi
  .object({
    PORT: joi.number().positive().default(3000),
    JWT_SECRET: joi.string().required(),
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
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  nodeEnv: envVars.NODE_ENV,
};
