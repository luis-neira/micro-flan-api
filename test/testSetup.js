'use strict'

// const { execSync } = require('node:child_process')
// const path = require('node:path')

const config = require('../src/config')
const { buildContainer } = require('../src/container')
const buildExpressApp = require('../src/app')
const runMigrationCommand = require('./run-migration-command')
// const makeKnexInstance = require('@infra/db')

// TODO: instead of invoking knex use a node child process and invoke the db-infra repo, use config to validate the path from an env var.
async function setupTestApp () {
  // fresh container
  const container = buildContainer({ config, logger: () => {} })
  // const knex = makeKnexInstance(config)

  // migrate db
  // await knex.migrate.latest()

  console.log('Running graphile-migrate migrations...')
  try {
    // Adjust this command to your actual migration command.
    // By default, graphile-migrate uses "graphile-migrate migrate"
    // execSync('npx graphile-migrate migrate', {
    //   cwd: path.resolve('..', 'micro-flan-migrations'),
    //   stdio: 'inherit' // show logs from the child process
    // })
    runMigrationCommand('npm run init:test')
  } catch (err) {
    console.error('Migration failed:', err)
    throw err
  }

  // build express app
  const app = buildExpressApp(container)

  return { app, container }
}

module.exports = setupTestApp
