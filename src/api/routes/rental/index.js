'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')
// const makeRentalAPI = require('./controller/index')

const makeValidator = require('@middleware/validate')
const createRentalSchema = require('./usecase/createRental/create-rental.schema')
const getRentalsSchema = require('./usecase/getRental/get-rentals.schema')
const getRentalTenantsSchema = require('./usecase/getRentalTenants/get-rental-tenants.schema')
const deleteRentalSchema = require('./usecase/deleteRental/delete-rental.schema')
const updateRentalSchema = require('./usecase/updateRental/update-rental.schema')

const router = express.Router()

const {
  // makeFunctionInvoker,
  makeInvoker
} = awilixExpress
// const api = makeFunctionInvoker(makeRentalAPI)

const { validate } = makeValidator({
  allErrors: true,
  coerceTypes: true
})

const api = makeInvoker(cradle => ({
  getRentals: cradle.getRentalsController,
  createRental: cradle.createRentalController,
  updateRental: cradle.updateRentalController,
  deleteRental: cradle.deleteRentalController,
  getRentalTenants: cradle.getRentalTenantsController
}))

router.route('/')
  .get(validate({ query: getRentalsSchema.querySchema }), api('getRentals'))
  .post(validate({ body: createRentalSchema.bodySchema }), api('createRental'))

router.route('/:id')
  .patch(validate({
    params: updateRentalSchema.paramsSchema,
    body: updateRentalSchema.bodySchema
  }), api('updateRental'))
  .delete(validate({ params: deleteRentalSchema.paramsSchema }), api('deleteRental'))

router.route('/:id/tenants')
  .get(validate({ params: getRentalTenantsSchema.paramsSchema }), api('getRentalTenants'))

module.exports = router
