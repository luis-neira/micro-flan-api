'use strict'

const initServer = require('../server')

function safeStartHttpServer (app, opts) {
  try {
    const { logger } = opts
    logger.info('Starting HTTP server...')
    const server = initServer(app, opts)
    return server
  } catch (err) {
    throw new Error(`Failed to start HTTP server: ${err.message}`, { cause: err })
  }
}

module.exports = safeStartHttpServer
