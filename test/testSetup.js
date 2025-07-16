'use strict'

const config = require('../src/config')
const { buildContainer } = require('../src/infra/ioc-container')
const buildExpressApp = require('../src/app')

async function setupTestApp () {
  // fresh container
  const container = buildContainer({ config, logger: () => {} })
  const knex = container.resolve('db')

  // migrate db
  await knex.migrate.latest()

  // build express app
  const app = buildExpressApp(container)

  return { app, container, knex }
}

module.exports = setupTestApp
