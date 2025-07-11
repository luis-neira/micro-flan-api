'use strict'

function timer (req, res, next) {
  req.requestTime = Date.now()
  next()
}

module.exports = timer
