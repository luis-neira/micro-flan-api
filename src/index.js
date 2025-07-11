'use strict'

const closeWithGrace = require('close-with-grace')
const { promisify } = require('node:util')
const buildLogger = require('./logger/builder')

const config = require('./config')
const { buildContainer } = require('./ioc-container')
const buildExpressApp = require('./app')
const initServer = require('./server')

const { instance: logger, stop: stopLogger } = buildLogger()

// let server = null;
// let container = null;

// closeWithGrace({ delay: 5000 }, async function ({ signal, err, manual }, cb) {
//   if (err) {
//     logger.error(err)
//   } else {
//     logger.info(`${signal} received, server closing`)
//   }

//   if (server) {
//     await promisify(server.close.bind(server))()
//     logger.info('HTTP server closed')
//   }

//   if (container) {
//     try {
//       await container.dispose()
//       logger.info('DI Container disposed')
//     } catch (disposeErr) {
//       logger.error(disposeErr, 'Error disposing DI Container:')
//     }
//   }

//   logger.info('Shutdown complete')
//   stopLogger();
// })

main()

async function main () {
  try {
    logger.info('Bootstrapping application...')

    let container = null

    try {
      logger.info('→ Building DI container')
      container = buildContainer({ config, buildLogger })
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
      app = buildExpressApp({
        config,
        logger
      })
      logger.info('✔ Express app created')
    } catch (err) {
      throw new Error(`Failed to initialize Express app: ${err.message}`, { cause: err })
    }

    let server = null

    try {
      logger.info('→ Starting HTTP server')
      server = initServer(app, {
        config,
        logger
      })
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

// async function setupContainer({ config }) {
//   try {
//     logger.info('→ Building DI container')
//     const c = buildContainer(config)
//     logger.info('✔ DI container built')
//     return c
//   } catch (err) {
//     throw new Error(`Failed to build DI container: ${err.message}`, { cause: err })
//   }
// }

// async function testDatabase(container) {
//   try {
//     logger.info('→ Testing database connection')
//     const db = container.resolve('db').instance
//     await db.raw('SELECT 1+1 AS result')
//     logger.info('✔ Database connected:', db.client.config.client)
//   } catch (err) {
//     throw new Error(`Failed to connect to database: ${err.message}`, { cause: err })
//   }
// }

// async function setupExpressApp({ config }) {
//   try {
//     logger.info('→ Initializing Express app')
//     const app = buildExpressApp(config)
//     logger.info('✔ Express app created')
//     return app
//   } catch (err) {
//     throw new Error(`Failed to initialize Express app: ${err.message}`, { cause: err })
//   }
// }

// async function startHttpServer(app) {
//   try {
//     logger.info('→ Starting HTTP server')
//     const s = initServer(app, config)
//     logger.info('✔ Server started')
//     return s
//   } catch (err) {
//     throw new Error(`Failed to start HTTP server: ${err.message}`, { cause: err })
//   }
// }

function formatBootstrapError (error) {
  let message = `Bootstrap error: ${error.message}`
  if (error.cause) {
    message += `\nCaused by: ${error.cause.stack || error.cause.message}`
  }
  return message
}
