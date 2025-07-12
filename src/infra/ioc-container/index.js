'use strict'

const awilix = require('awilix')

const makeRentalRepo = require('../../api/repos/rental')
const makeTenantRepo = require('../../api/repos/tenant')
const makeKnexInstance = require('../db')

function buildContainer ({ config, logger }) {
  const {
    asFunction,
    asValue,
    createContainer,
    Lifetime,
    InjectionMode
  } = awilix

  const awilixContainer = createContainer()

  awilixContainer.register({
    config: asValue(config),
    logger: asValue(logger),
    db: asFunction(makeKnexInstance, {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC,
      dispose: (knex) => knex.destroy()
    }),
    rentalRepo: asFunction(makeRentalRepo, {
      lifetime: Lifetime.SINGLETON
    }),
    tenantRepo: asFunction(makeTenantRepo, {
      lifetime: Lifetime.SINGLETON
    })
  })

  return awilixContainer
}

module.exports = { buildContainer }
