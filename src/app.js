'use strict'

const express = require('express')
const { scopePerRequest } = require('awilix-express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const { xss } = require('express-xss-sanitizer')
const swaggerUi = require('swagger-ui-express')
const specs = require('./infra/swagger')

const pinoHttp = require('./middleware/logger')
const cors = require('./middleware/cors')
const timer = require('./middleware/timer')
const notFoundHandler = require('./middleware/not-found')
const err = require('./middleware/error')

const rentalRoutes = require('./api/rental')
const tenantRoutes = require('./api/tenant')
const authRoutes = require('./api/auth')

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

  // Serve Swagger docs at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  })

  // error handlers
  app.use(notFoundHandler)
  app.use(err.validationErrorHandler)
  app.use(err.errorConverter)
  app.use(err.errorHandler)

  return app
}

module.exports = buildExpressApp
