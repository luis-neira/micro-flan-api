'use strict'

const wrap = require('@lib/wrap-async')

function getTenantsController ({ getTenantsRepository }) {
  return wrap(async (req, res, next) => {
    const tenants = await getTenantsRepository()

    res.json(tenants)
  })
}

module.exports = getTenantsController
