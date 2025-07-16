'use strict'

const createError = require('http-errors')

function getRentals ({ rentalRepo }) {
  // TODO add middleware for validation i.e. zod
  return async (req, res, next) => {
    const { type } = req.query

    if (type && typeof type !== 'string') {
      return next(createError.BadRequest())
    }

    const rentals = await rentalRepo.getRentals(type)

    res.json(rentals)
  }
}

module.exports = getRentals
