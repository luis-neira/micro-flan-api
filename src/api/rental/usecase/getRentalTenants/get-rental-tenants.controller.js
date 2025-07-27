'use strict'

const wrap = require('@lib/wrap-async')

function getRentalTenantsController ({ getRentalTenantsRepository }) {
  return wrap(async (req, res, next) => {
    const { id } = req.params

    const tenants = await getRentalTenantsRepository(id)

    res.json(tenants)
  })
}

module.exports = getRentalTenantsController
