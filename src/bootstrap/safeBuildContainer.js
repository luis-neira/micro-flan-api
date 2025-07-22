'use strict'

const { buildContainer } = require('../container')

function safeBuildContainer ({ config, logger }) {
  try {
    logger.debug('Building DI container...')
    const container = buildContainer({ config, logger })
    logger.debug('DI container built')
    return container
  } catch (err) {
    throw new Error(`Failed to build DI container: ${err.message}`, { cause: err })
  }
}

module.exports = safeBuildContainer
