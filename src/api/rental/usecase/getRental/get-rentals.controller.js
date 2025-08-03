'use strict'

function getRentalsController ({ getRentalsRepository }) {
  return async (req, res, next) => {
    const { type } = req.query

    const rentals = await getRentalsRepository(type)

    res.json(rentals)
  }
}

module.exports = getRentalsController
