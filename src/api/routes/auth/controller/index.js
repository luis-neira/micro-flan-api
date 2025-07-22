'use strict'

const wrapController = require('@lib/wrap-controller')
const login = require('../usecase/login/login.controller')

function createAuthController () {
  const controller = {
    login: login()
  }

  return wrapController(controller)
}

module.exports = createAuthController
