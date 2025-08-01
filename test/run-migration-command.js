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

function reset () {
  runMigrationCommand('npm run gm -- reset --erase')
}

function migrate () {
  runMigrationCommand('npm run gm -- migrate')
}

module.exports = runMigrationCommand
module.exports.reset = reset
module.exports.migrate = migrate
