'use strict'

const wrap = require('@lib/wrap-async')

function getRentalsController ({ getRentalsRepository }) {
  return wrap(async (req, res, next) => {
    const { type } = req.query

    const rentals = await getRentalsRepository(type)

    res.json(rentals)
  })
}

module.exports = getRentalsController
