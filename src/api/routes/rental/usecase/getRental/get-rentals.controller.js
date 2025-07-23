'use strict'

function getRentals ({ rentalRepo }) {
  return async (req, res, next) => {
    const { type } = req.query

    const rentals = await rentalRepo.getRentals(type)

    res.json(rentals)
  }
}

module.exports = getRentals
