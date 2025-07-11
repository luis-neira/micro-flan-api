'use strict'

const buildExpressApp = require('../app')

function initExpressApp (opts) {
  try {
    const { logger } = opts
    logger.info('→ Initializing Express app')
    const app = buildExpressApp(opts)
    logger.info('✔ Express app created')
    return app
  } catch (err) {
    throw new Error(`Failed to build Express app: ${err.message}`, { cause: err })
  }
}

module.exports = initExpressApp
