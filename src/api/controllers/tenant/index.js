'use strict'

const wrapController = require('@lib/wrap-controller')
const getTenants = require('./get-tenants')

function createTenantsController (cradle) {
  const controller = {
    getTenants: getTenants(cradle)
  }

  return wrapController(controller)
}

module.exports = createTenantsController
