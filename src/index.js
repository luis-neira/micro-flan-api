'use strict'

const closeWithGrace = require('close-with-grace')

const config = require('./config')
const { buildContainer } = require('./ioc-container')
const buildExpressApp = require('./app')
const initServer = require('./server')

let server
let container

closeWithGrace({ delay: 5000 }, async function ({ signal, err, manual }, cb) {
  if (err) {
    console.error(err)
  } else {
    console.log(`${signal} received, server closing`)
  }

  if (server) {
    await new Promise((resolve) => server.close(resolve))
    console.log('HTTP server closed')
  }

  if (container) {
    try {
      await container.dispose()
      console.log('DI Container disposed')
    } catch (disposeErr) {
      console.error('Error disposing DI Container:', disposeErr)
    }
  }

  console.log('Shutdown complete')
})

bootstrapApp()

async function bootstrapApp() {
  try {
    console.log('Bootstrapping application...')

    container = await setupContainer()
    await testDatabase(container)
    const app = await setupExpressApp()
    server = await startHttpServer(app)

    console.log('Application is up and running')
  } catch (error) {
    console.log(formatBootstrapError(error))
    process.exit(1)
  }
}

async function setupContainer() {
  try {
    console.log('→ Building DI container')
    const c = buildContainer(config)
    console.log('✔ DI container built')
    return c
  } catch (err) {
    throw new Error(`Failed to build DI container: ${err.message}`, { cause: err })
  }
}

async function testDatabase(container) {
  try {
    console.log('→ Testing database connection')
    const db = container.resolve('db')
    await db.raw('SELECT 1+1 AS result')
    console.log('✔ Database connected:', db.client.config.client)
  } catch (err) {
    throw new Error(`Failed to connect to database: ${err.message}`, { cause: err })
  }
}

async function setupExpressApp() {
  try {
    console.log('→ Initializing Express app')
    const app = buildExpressApp(config)
    console.log('✔ Express app created')
    return app
  } catch (err) {
    throw new Error(`Failed to initialize Express app: ${err.message}`, { cause: err })
  }
}

async function startHttpServer(app) {
  try {
    console.log('→ Starting HTTP server')
    const s = initServer(app, config)
    console.log('✔ Server started')
    return s
  } catch (err) {
    throw new Error(`Failed to start HTTP server: ${err.message}`, { cause: err })
  }
}

function formatBootstrapError(error) {
  let message = `\nBootstrap error: ${error.message}`
  if (error.cause) {
    message += `\nCaused by: ${error.cause.stack || error.cause.message}`
  }
  return message
}
