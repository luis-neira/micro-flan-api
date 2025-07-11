'use strict'

const express = require('express')
const { scopePerRequest } = require('awilix-express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const { xss } = require('express-xss-sanitizer')

const { getContainer } = require('./ioc-container')

const logger = require('./middleware/logger')
const cors = require('./middleware/cors')
const timer = require('./middleware/timer')
const notFoundHandler = require('./middleware/not-found')
const { errorHandler, errorConverter } = require('./middleware/error')

const rentalRoutes = require('./routes/rental')
const tenantRoutes = require('./routes/tenant')
const authRoutes = require('./routes/auth')

function buildExpressApp (config) {
  const app = express()

  app.use(logger(config))
  app.use(timer)

  // new scope for each request!
  app.use(scopePerRequest(getContainer()))

  // parsing
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // security
  app.use(xss())
  app.use(helmet())
  app.use(cors(config))

  // routes
  app.use('/rentals', rentalRoutes)
  app.use('/tenants', tenantRoutes)
  app.use('/auth', authRoutes)

  // error handlers
  app.use(notFoundHandler)
  app.use(errorConverter)
  app.use(errorHandler)

  return app
}

module.exports = buildExpressApp
