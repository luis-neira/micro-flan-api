'use strict'

function createRentalController ({ createRentalRepository }) {
  return async (req, res, next) => {
    const rental = req.body

    const newRental = await createRentalRepository(rental)

    res.status(201).json(newRental)
  }
}

module.exports = createRentalController
