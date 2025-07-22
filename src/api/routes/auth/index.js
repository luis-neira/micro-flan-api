'use strict'

const express = require('express')

const createAuthController = require('./controller/index')

const router = express.Router()
const authController = createAuthController()

router.post('/login', authController.login)

module.exports = router
