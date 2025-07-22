'use strict'

const wrapController = require('@lib/wrap-controller')
const getTenants = require('../usecase/getTenants/get-tenants.controller')

function createTenantsController (cradle) {
  const controller = {
    getTenants: getTenants(cradle)
  }

  return wrapController(controller)
}

module.exports = createTenantsController
