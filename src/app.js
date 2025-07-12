'use strict'

const express = require('express')
const { scopePerRequest } = require('awilix-express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const { xss } = require('express-xss-sanitizer')

const pinoHttp = require('./api/middleware/logger')
const cors = require('./api/middleware/cors')
const timer = require('./api/middleware/timer')
const notFoundHandler = require('./api/middleware/not-found')
const { errorHandler, errorConverter } = require('./api/middleware/error')

const rentalRoutes = require('./api/routes/rental')
const tenantRoutes = require('./api/routes/tenant')
const authRoutes = require('./api/routes/auth')

function buildExpressApp (container) {
  const { config, logger } = container.cradle

  const app = express()

  app.use(pinoHttp({ config, logger }))
  app.use(timer)

  // new scope for each request!
  app.use(scopePerRequest(container))

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
