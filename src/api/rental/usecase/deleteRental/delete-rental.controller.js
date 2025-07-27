'use strict'

const createError = require('http-errors')
const wrap = require('@lib/wrap-async')

function deleteRentalController ({ deleteRentalRepository }) {
  return wrap(async (req, res, next) => {
    const { id } = req.params

    const result = await deleteRentalRepository(id)

    if (result === 0) {
      return next(createError.NotFound())
    }

    res.sendStatus(200)
  })
}

module.exports = deleteRentalController
