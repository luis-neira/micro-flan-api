'use strict'

const awilix = require('awilix')

const { makePgInstance } = require('../infra/db')

function buildContainer ({ config, logger }) {
  const {
    asFunction,
    asValue,
    createContainer,
    Lifetime,
    InjectionMode
  } = awilix

  const awilixContainer = createContainer()

  awilixContainer.loadModules([
    'src/api/**/usecase/**/*.repository.js',
    'src/api/**/usecase/**/*.controller.js'
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  })

  awilixContainer.register({
    config: asValue(config),
    logger: asValue(logger),
    db: asFunction(makePgInstance, {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC,
      dispose: (pg) => pg.end()
    })
  })

  return awilixContainer
}

module.exports = { buildContainer }
