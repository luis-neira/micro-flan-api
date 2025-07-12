'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')
const makeRentalAPI = require('../controllers/rental')

const { makeFunctionInvoker } = awilixExpress

const router = express.Router()
const api = makeFunctionInvoker(makeRentalAPI)

router.route('/').get(api('getRentals')).post(api('createRental'))

router.route('/:id').patch(api('updateRental')).delete(api('deleteRental'))

router.route('/:id/tenants').get(api('getRentalTenants'))

module.exports = router
