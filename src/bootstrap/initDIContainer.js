'use strict'

const { buildContainer } = require('../container')

function initDIContainer ({ config, logger }) {
  try {
    logger.info('→ Building DI container')
    const container = buildContainer({ config, logger })
    logger.info('✔ DI container built')
    return container
  } catch (err) {
    throw new Error(`Failed to build DI container: ${err.message}`, { cause: err })
  }
}

module.exports = initDIContainer
