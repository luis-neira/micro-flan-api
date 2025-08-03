'use strict'

const Ajv = require('ajv')
const { defaultSchema } = require('./default.schema')
const { fullSchema } = require('./full.schema')

const ajv = new Ajv()

const ajvWithDefaults = new Ajv({ useDefaults: true })
const ajvStrict = new Ajv() // no `useDefaults` here — we've already applied them

const defaultsValidator = ajvWithDefaults.compile(defaultSchema)
const fullValidator = ajvStrict.compile(fullSchema)

// Clone env so we don't modify process.env directly
const env = { ...process.env }

// Step 1: Apply defaults
defaultsValidator(env)

// Step 2: Validate
if (!fullValidator(env)) {
  const error = new Error(ajv.errorsText(fullValidator.errors, { dataVar: 'env' }))
  error.errors = fullValidator.errors
  throw error
}

module.exports = Object.freeze({
  postgresPassword: env.POSTGRES_PASSWORD,
  postgresDatabase: env.POSTGRES_DB,
  postgresHost: env.POSTGRES_HOST,
  postgresPort: env.POSTGRES_PORT,
  postgresUser: env.POSTGRES_USER,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  enableStackTrace: env.ENABLE_STACK_TRACE,
  enableServerLogging: env.ENABLE_SERVER_LOGGING,
  enableCors: env.ENABLE_CORS,
  dbEnv: env.DB_ENV,
  logLevel: env.LOG_LEVEL
})
