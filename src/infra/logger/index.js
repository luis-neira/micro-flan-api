'use strict'

const pino = require('pino')

function buildLogger (config) {
  let instance = null

  if (!instance) {
    instance = pino(config)
  }

  return instance
}

module.exports = buildLogger
