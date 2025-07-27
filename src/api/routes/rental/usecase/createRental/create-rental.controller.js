'use strict'

const wrap = require('@lib/wrap-async')

function createRentalController ({ createRentalRepository }) {
  return wrap(async (req, res, next) => {
    const rental = req.body

    // const newRental = await rentalRepo.createRental(rental)
    const newRental = await createRentalRepository(rental)

    res.status(201).json(newRental)
  })
}

module.exports = createRentalController
