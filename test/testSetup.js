'use strict'

const path = require('node:path')
const fs = require('node:fs')

const { buildContainer } = require('../src/infra/ioc-container')
const buildExpressApp = require('../src/app')
const config = require('../src/config')

async function setupTestApp () {
  // fresh container
  const container = buildContainer({ config, logger: () => {} })
  const knex = container.resolve('db')

  // ensure test db file exists
  const location = path.join(__dirname, '..', 'tmp', 'test.db')
  const dirName = path.dirname(location)
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true })
  }

  // migrate & seed
  await knex.migrate.latest()
  await knex.seed.run()

  // build app by passing container
  const app = buildExpressApp(container)

  return { app, container, knex }
}

module.exports = setupTestApp
