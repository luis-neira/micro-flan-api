'use strict'

const pinoHttp = require('pino-http')

module.exports = ({ config, logger }) => {
  if (config.enableServerLogging === 'false') {
    return (req, res, next) => next()
  }

  return pinoHttp({
    logger: logger || undefined
  })
}
