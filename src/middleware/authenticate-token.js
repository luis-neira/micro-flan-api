'use strict'

const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const config = require('../config')

function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return next(createError.Unauthorized())
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return next(createError.Forbidden())
    }
    req.user = user
    next()
  })
}

module.exports = authenticateToken
