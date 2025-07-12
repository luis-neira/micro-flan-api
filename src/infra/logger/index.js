'use strict'

const pino = require('pino')

function buildLogger () {
  let instance = null

  if (!instance) {
    instance = pino()
  }

  return instance
}

module.exports = buildLogger
