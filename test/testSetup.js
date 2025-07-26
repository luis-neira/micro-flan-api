'use strict'

const config = require('../src/config')
const { buildContainer } = require('../src/container')
const buildExpressApp = require('../src/app')
const makeKnexInstance = require('@infra/db')

async function setupTestApp () {
  // fresh container
  const container = buildContainer({ config, logger: () => {} })
  const knex = makeKnexInstance(config)

  // migrate db
  await knex.migrate.latest()

  // build express app
  const app = buildExpressApp(container)

  return { app, container, knex }
}

module.exports = setupTestApp
