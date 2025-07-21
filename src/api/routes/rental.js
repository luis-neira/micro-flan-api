'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')

const makeValidator = require('@middleware/validate')
const makeRentalAPI = require('../controllers/rental')
const { bodySchema } = require('../schemas/rental/create-rental')

const { makeFunctionInvoker } = awilixExpress

const router = express.Router()
const api = makeFunctionInvoker(makeRentalAPI)

const { validate } = makeValidator({ allErrors: true })

router.route('/').get(api('getRentals')).post(validate({ body: bodySchema }), api('createRental'))

router.route('/:id').patch(api('updateRental')).delete(api('deleteRental'))

router.route('/:id/tenants').get(api('getRentalTenants'))

module.exports = router
