'use strict'

const { execSync } = require('node:child_process')
const path = require('node:path')

function runMigrationCommand (cmd) {
  execSync(cmd, {
    cwd: path.resolve('..', 'micro-flan-migrations'),
    stdio: [
      'inherit',
      'ignore',
      'inherit'
    ],
    env: {
      ...process.env,
      DATABASE_URL: 'postgres://postgres:password@localhost:5555/myapp',
      SHADOW_DATABASE_URL: 'postgres://postgres:password@localhost:5555/myapp_shadow',
      ROOT_DATABASE_URL: 'postgres://postgres:password@localhost:5555/postgres'
    }
  })
}

module.exports = runMigrationCommand
