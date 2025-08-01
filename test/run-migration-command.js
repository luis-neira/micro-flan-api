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
      ...process.env
    }
  })
}

module.exports = runMigrationCommand
