'use strict'

const createError = require('http-errors')

const config = require('../../config')

const errorHandler = (err, req, res, next) => {
  const showStackTrace = config.enableStackTrace === 'true'
  const { statusCode, message } = err

  if (showStackTrace && statusCode >= 500) {
    req.log.error(err)
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

module.exports = {
  errorHandler,
  errorConverter
}
