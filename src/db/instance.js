'use strict'

const knex = require('knex')
const getKnexfile = require('../../knexfile')

function makeKnexInstance (config) {
  const knexfile = getKnexfile(config)
  return knex(knexfile[config.dbEnv])
}

module.exports = makeKnexInstance
