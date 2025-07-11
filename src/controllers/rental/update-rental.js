'use strict'

const createError = require('http-errors')

function updateRental ({ rentalRepo }) {
  return async (req, res, next) => {
    try {
      const rental = req.body
      const { id } = req.params

      const parsedId = Number(id)

      if (Number.isNaN(parsedId)) {
        return next(createError.BadRequest())
      }

      const [updatedRental] = await rentalRepo.updateRental(id, rental)

      if (updatedRental == null) {
        return next(createError.NotFound())
      }

      res.json(updatedRental)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = updateRental
