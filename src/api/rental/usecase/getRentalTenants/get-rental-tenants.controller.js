'use strict'

function getRentalTenantsController ({ getRentalTenantsRepository }) {
  return async (req, res, next) => {
    const { id } = req.params

    const tenants = await getRentalTenantsRepository(id)

    res.json(tenants)
  }
}

module.exports = getRentalTenantsController
