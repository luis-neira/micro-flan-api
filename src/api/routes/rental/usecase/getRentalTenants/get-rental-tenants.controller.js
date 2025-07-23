'use strict'

function getRentalTenants ({ rentalRepo }) {
  return async (req, res, next) => {
    const { id } = req.params

    const tenants = await rentalRepo.getRentalTenants(id)

    res.json(tenants)
  }
}

module.exports = getRentalTenants
