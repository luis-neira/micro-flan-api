'use strict'

const { buildContainer } = require('../ioc-container')

function initDIContainer ({ config, logger }) {
  try {
    module.exports.logInfo('→ Building DI container')
    const container = buildContainer({ config, logger })
    module.exports.logInfo('✔ DI container built')
    return container
  } catch (err) {
    throw new Error(`Failed to build DI container: ${err.message}`, { cause: err })
  }
}

module.exports.initDIContainer = initDIContainer

module.exports.logError = console.error
module.exports.logInfo = console.log
