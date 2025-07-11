'use strict'

const pino = require('pino')
const knex = require('knex')

const config = require('../src/config')
const getKnexfile = require('../knexfile')

const knexfile = getKnexfile(config)
const db = knex(knexfile[config.dbEnv])

let pinoOpts = {}
if (config.dbEnv === "development") {
  pinoOpts.transport = {
    target: "pino-dev"
  }
}

const logger = pino(pinoOpts)

// Re-run knex with fresh migrations/seeds
db.migrate
  .latest()
  .then(() => db.destroy())
  .then(() => {
    logger.info('Data successfully imported to rentals.db')
  })
  .catch((err) => {
    logger.error(err, "Migration error")
    process.exit(1)
  })
