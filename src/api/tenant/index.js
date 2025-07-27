'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')

const router = express.Router()

const { makeInvoker } = awilixExpress

const api = makeInvoker(cradle => ({
  getTenants: cradle.getTenantsController
}))

router.route('/').get(api('getTenants'))

module.exports = router
