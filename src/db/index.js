'use strict'

const knex = require('knex')
const getKnexfile = require('../../knexfile')

// TODO: use PG instead
function makeKnexInstance (config) {
  let instance = null

  if (!instance) {
    const knexfile = getKnexfile(config)
    instance = knex(knexfile[config.dbEnv])
  }

  return instance
}

module.exports = makeKnexInstance
