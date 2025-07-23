'use strict'

const createError = require('http-errors')

function deleteRental ({ rentalRepo }) {
  return async (req, res, next) => {
    const { id } = req.params

    const result = await rentalRepo.deleteRental(id)

    if (result === 0) {
      return next(createError.NotFound())
    }

    res.sendStatus(200)
  }
}

module.exports = deleteRental
