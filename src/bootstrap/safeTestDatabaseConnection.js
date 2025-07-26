'use strict'

async function safeTestDatabaseConnection ({ db, logger }) {
  try {
    logger.debug('Testing database connection...')
    await db.query('SELECT 1+1 AS result')
    const client = await db.getClient()
    client.release()
    const { port } = client.connectionParameters
    logger.info(`Database connected on port ${port}`)
  } catch (err) {
    throw new Error(`Failed to connect to database: ${err.message}`, { cause: err })
  }
}

module.exports = safeTestDatabaseConnection
