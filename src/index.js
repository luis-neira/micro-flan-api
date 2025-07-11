'use strict'

const closeWithGrace = require('close-with-grace')

const config = require('./config')
const { buildContainer } = require('./ioc-container')
const buildExpressApp = require('./app')
const initServer = require('./server')

let server
let container

// Register lifecycle hooks early
closeWithGrace({ delay: 5000 }, function ({ signal, err, manual }, cb) {
  if (err) {
    console.error(err)
  } else {
    console.log(`${signal} received, server closing`)
  }

  // await closeYourServer()
  if (server) {
    server.close(() => {
      console.log('HTTP server closed')

      if (container) {
        container
          .dispose()
          .then(() => {
            console.log('DI Container disposed')
            console.log('Shutdown complete')
          })
          .catch(cb)
          .finally(cb)
      }
    })
  } else {
    cb()
  }
})

bootstrapApp()

async function bootstrapApp () {
  try {
    console.log('Bootstrapping application...')

    // Setup DI container
    container = buildContainer(config)

    // Test DB connection
    const db = container.resolve('db')
    await db.raw('SELECT 1+1 AS result')
    console.log('Database connected:', db.client.config.client)

    // Initialize Express app and HTTP server
    const app = buildExpressApp(config)
    server = initServer(app, config)

    console.log('Application is up and running')
  } catch (error) {
    console.error('Bootstrap error:', error)
    process.exit(1)
  }
}
