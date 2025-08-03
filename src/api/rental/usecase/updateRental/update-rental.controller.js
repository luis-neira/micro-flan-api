'use strict'

const createError = require('http-errors')

function updateRentalController ({ updateRentalRepository }) {
  return async (req, res, next) => {
    const rental = req.body
    const { id } = req.params

    const [updatedRental] = await updateRentalRepository(id, rental)

    if (updatedRental == null) {
      return next(createError.NotFound())
    }

    res.json(updatedRental)
  }
}

module.exports = updateRentalController
