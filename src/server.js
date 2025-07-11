'use strict'

const http = require('node:http')

let server = null

function initServer (app, { config, logger}) {
  server = http.createServer(app)

  server.listen(config.port, '0.0.0.0')
  server.on('error', (err) => onError(err, logger))
  server.on('listening', () => onListening(logger))

  return server
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error, logger) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const addr = server.address()

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error('Port ' + addr.port + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error('Port ' + addr.port + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening (logger) {
  const addr = server.address()
  logger.info('Server listening on port ' + addr.port)
}

module.exports = initServer
