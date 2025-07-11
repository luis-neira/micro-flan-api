'use strict'

const closeWithGrace = require('close-with-grace')
const { promisify } = require('node:util')
const buildLogger = require('./logger/builder')

const config = require('./config')
const { buildContainer } = require('./ioc-container')
const buildExpressApp = require('./app')
const initServer = require('./server')
const { instance: logger, stop: stopLogger } = buildLogger()

main()

async function main () {
  try {
    logger.info('Bootstrapping application...')

    let container = null

    try {
      logger.info('→ Building DI container')
      container = buildContainer({ config, logger })
      logger.info('✔ DI container built')
    } catch (err) {
      throw new Error(`Failed to build DI container: ${err.message}`, { cause: err })
    }

    try {
      logger.info('→ Testing database connection')
      const db = container.resolve('db')
      await db.raw('SELECT 1+1 AS result')
      const { connection } = db.client.config
      logger.info(`✔ Database connected on port ${connection.port}`)
    } catch (err) {
      throw new Error(`Failed to connect to database: ${err.message}`, { cause: err })
    }

    let app = null

    try {
      logger.info('→ Initializing Express app')
      app = buildExpressApp(container.cradle)
      logger.info('✔ Express app created')
    } catch (err) {
      throw new Error(`Failed to initialize Express app: ${err.message}`, { cause: err })
    }

    let server = null

    try {
      logger.info('→ Starting HTTP server')
      server = initServer(app, container.cradle)
    } catch (err) {
      throw new Error(`Failed to start HTTP server: ${err.message}`, { cause: err })
    }

    closeWithGrace({ delay: 5000 }, async function ({ signal, err, manual }) {
      if (err) {
        logger.error(err)
      } else {
        logger.info(`${signal} received, server closing`)
      }

      if (server) {
        await promisify(server.close.bind(server))()
        logger.info('HTTP server closed')
      }

      if (container) {
        try {
          await container.dispose()
          logger.info('DI Container disposed')
        } catch (disposeErr) {
          logger.error(disposeErr, 'Error disposing DI Container:')
        }
      }

      logger.info('Shutdown complete')
      stopLogger()
    })
  } catch (error) {
    logger.error(formatBootstrapError(error))
    process.exit(1)
  }
}

function formatBootstrapError (error) {
  let message = `Bootstrap error: ${error.message}`
  if (error.cause) {
    message += `\nCaused by: ${error.cause.stack || error.cause.message}`
  }
  return message
}
