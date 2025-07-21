'use strict'

const createError = require('http-errors')
const { ValidationError } = require('express-json-validator-middleware')

const config = require('@config')

const errorHandler = (err, req, res, next) => {
  const showStackTrace = config.enableStackTrace === 'true'
  const { statusCode, message } = err

  if (showStackTrace && statusCode >= 500) {
    if (config.enableServerLogging === 'true') {
      req.log.error(err)
    } else {
      console.error(err)
    }
  }

  const response = {
    error: true,
    code: statusCode,
    message,
    ...(showStackTrace && { stack: err.stack })
  }

  res.status(response.code)
  res.json(response)
}

const errorConverter = (err, req, res, next) => {
  let error = err

  if (!createError.isHttpError(error)) {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Something went wrong!'
    const stack = error.stack

    error = createError(statusCode, message)
    if (stack) {
      error.stack = stack
    }
  }

  next(error)
}

const validationErrorHandler = (error, request, response, next) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
    response.status(400).send(error.validationErrors)
    next()
  } else {
    // Pass error on if not a validation error
    next(error)
  }
}

module.exports = {
  errorHandler,
  errorConverter,
  validationErrorHandler
}
