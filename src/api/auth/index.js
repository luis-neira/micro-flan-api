'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')

// const createAuthController = require('./controller/index')

const router = express.Router()
// const authController = createAuthController()

const {
  makeInvoker
} = awilixExpress

const api = makeInvoker(cradle => ({
  login: cradle.loginController
}))

// router.post('/login', authController.login)
router.post('/login', api('login'))

module.exports = router
