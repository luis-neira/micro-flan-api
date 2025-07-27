'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')
// const makeTenantAPI = require('./controller/index')

const router = express.Router()

const {
  // makeFunctionInvoker,
  makeInvoker
} = awilixExpress
// const api = makeFunctionInvoker(makeTenantAPI)

const api = makeInvoker(cradle => ({
  getTenants: cradle.getTenantsController
}))

router.route('/').get(api('getTenants'))

module.exports = router
