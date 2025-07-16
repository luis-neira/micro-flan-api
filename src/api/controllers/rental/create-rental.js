'use strict'

function createRental ({ rentalRepo }) {
  return async (req, res, next) => {
    const rental = req.body

    const newRental = await rentalRepo.createRental(rental)

    res.status(201).json(newRental)
  }
}

module.exports = createRental
