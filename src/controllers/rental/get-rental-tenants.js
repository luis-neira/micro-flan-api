'use strict'

const createError = require('http-errors')

function getRentalTenants ({ rentalRepo }) {
  return async (req, res, next) => {
    try {
      const { id } = req.params

      const sanitizedId = Number(id)

      if (Number.isNaN(sanitizedId)) {
        return next(createError.BadRequest())
      }

      const tenants = await rentalRepo.getRentalTenants(sanitizedId)

      res.json(tenants)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = getRentalTenants
