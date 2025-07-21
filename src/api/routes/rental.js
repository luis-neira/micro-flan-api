'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')
const { Validator } = require('express-json-validator-middleware')
const addFormats = require('ajv-formats')
const makeRentalAPI = require('../controllers/rental')
const { bodySchema } = require('../schemas/rental/create-rental')

const { makeFunctionInvoker } = awilixExpress

const router = express.Router()
const api = makeFunctionInvoker(makeRentalAPI)

const validator = new Validator({ allErrors: true })
addFormats(validator.ajv)
const validate = validator.validate

router.route('/').get(api('getRentals')).post(validate({ body: bodySchema }), api('createRental'))

router.route('/:id').patch(api('updateRental')).delete(api('deleteRental'))

router.route('/:id/tenants').get(api('getRentalTenants'))

module.exports = router
