'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')
const makeTenantAPI = require('./controller/index')

const router = express.Router()

const { makeFunctionInvoker } = awilixExpress
const api = makeFunctionInvoker(makeTenantAPI)

router.route('/').get(api('getTenants'))

module.exports = router
