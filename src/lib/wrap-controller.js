'use strict'

const wrapAsync = require('./wrap-async')

const wrapController = (controller) => {
  const wrapped = {}
  for (const key in controller) {
    wrapped[key] = wrapAsync(controller[key])
  }
  return wrapped
}

module.exports = wrapController
