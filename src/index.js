'use strict'

require('module-alias/register')
const closeWithGrace = require('close-with-grace')
const { promisify } = require('node:util')

const config = require('./config')
const buildLogger = require('./infra/logger')

const safeBuildContainer = require('./bootstrap/safeBuildContainer')
const safeTestDatabaseConnection = require('./bootstrap/safeTestDatabaseConnection')
const safeBuildExpressApp = require('./bootstrap/safeBuildExpressApp')
const safeStartHttpServer = require('./bootstrap/safeStartHttpServer')

main()

async function main () {
  const logger = buildLogger()

  try {
    logger.info('Bootstrapping application...')

    const container = safeBuildContainer({ config, logger })

    await safeTestDatabaseConnection(container.cradle)

    const app = safeBuildExpressApp(container)
    const server = safeStartHttpServer(app, container.cradle)

    closeWithGrace({ delay: 5000 }, async function ({ signal, err, manual }) {
      if (err) {
        logger.error(err)
      } else {
        logger.info(`${signal} received, server closing`)
      }

      try {
        await promisify(server.close.bind(server))()
        logger.info('HTTP server closed')
      } catch (error) {
        logger.error(error, 'Error closing server')
      }

      try {
        await container.dispose()
        logger.info('DI Container disposed')
      } catch (disposeErr) {
        logger.error(disposeErr, 'Error disposing DI Container')
      }

      logger.info('Shutdown complete')
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
