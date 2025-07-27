'use strict'

const createError = require('http-errors')
const wrap = require('@lib/wrap-async')

function updateRentalController ({ updateRentalRepository }) {
  return wrap(async (req, res, next) => {
    const rental = req.body
    const { id } = req.params

    const [updatedRental] = await updateRentalRepository(id, rental)

    if (updatedRental == null) {
      return next(createError.NotFound())
    }

    res.json(updatedRental)
  })
}

module.exports = updateRentalController
