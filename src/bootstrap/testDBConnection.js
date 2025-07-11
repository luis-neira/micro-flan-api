'use strict'

async function testDatabaseConnection({ db, logger }) {
  try {
    logger.info('→ Testing database connection')
    await db.raw('SELECT 1+1 AS result')
    const { connection } = db.client.config
    logger.info(`✔ Database connected on port ${connection.port}`)
  } catch (err) {
    throw new Error(`Failed to connect to database: ${err.message}`, { cause: err })
  }
}

module.exports = testDatabaseConnection;
