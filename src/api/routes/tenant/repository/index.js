'use strict'

const getTenants = require('../usecase/getTenants/get-tenants.repository')

function createTenantsController (cradle) {
  return {
    getTenants: getTenants(cradle)
  }
}

module.exports = createTenantsController
