'use strict'

const getTenants = require('./get-tenants')

function createTenantsController (cradle) {
  return {
    getTenants: getTenants(cradle)
  }
}

module.exports = createTenantsController
