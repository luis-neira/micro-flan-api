'use strict'

const wrapController = require('@lib/wrap-controller')
const login = require('./login')

function createAuthController () {
  const controller = {
    login: login()
  }

  return wrapController(controller)
}

module.exports = createAuthController
