'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')

const router = express.Router()

const {
  makeInvoker
} = awilixExpress

const api = makeInvoker(cradle => ({
  login: cradle.loginController
}))

router.post('/login', api('login'))

module.exports = router
