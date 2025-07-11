'use strict'

const knex = require('knex')
const getKnexfile = require('../../knexfile')

function makeKnexInstance (config) {
  let instance = null;

  if (!instance) {
    const knexfile = getKnexfile(config)
    instance = knex(knexfile[config.dbEnv])
  }

  return instance
}

module.exports = makeKnexInstance
