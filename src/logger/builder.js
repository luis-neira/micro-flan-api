'use strict'

const pino = require('pino')

function buildLogger () {
  let instance = null

  if (!instance) {
    instance = pino()
  }

  async function stop () {
    instance = null
  }

  return {
    instance,
    stop
  }
}

module.exports = buildLogger
