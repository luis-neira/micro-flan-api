'use strict'

function getTenantsController ({ getTenantsRepository }) {
  return async (req, res, next) => {
    const tenants = await getTenantsRepository()

    res.json(tenants)
  }
}

module.exports = getTenantsController
