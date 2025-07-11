'use strict'

const awilix = require('awilix')

const makeRentalRepo = require('../repos/rental')
const makeTenantRepo = require('../repos/tenant')
const makeKnexInstance = require('../db')

// let awilixContainer

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

// function getContainer () {
//   if (!awilixContainer) {
//     throw new Error('DI Container uninitialized')
//   }

//   return awilixContainer
// }

// function resetContainer () {
//   awilixContainer = null
// }

// function hasContainer () {
//   return !!awilixContainer
// }

// module.exports = { getContainer, buildContainer, resetContainer, hasContainer }
module.exports = { buildContainer }
