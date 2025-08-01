'use strict'

const pg = require('pg')
const buildLogger = require('../logger')

function makePgInstance (config) {
  let pool = null
  const logger = buildLogger({
    level: config.logLevel
  })

  if (!pool) {
    const { Pool } = pg
    pool = new Pool({
      user: config.postgresUser,
      password: config.postgresPassword,
      host: config.postgresHost,
      port: config.postgresPort,
      database: config.postgresDatabase,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      maxLifetimeSeconds: 60
    })
  }

  return {
    end: () => pool.end(),
    query: async (text, params) => {
      const start = Date.now()
      const res = await pool.query(text, params)
      const duration = Date.now() - start
      logger.debug(`executed query { text: ${text}, duration: ${duration}ms, rows: ${res.rowCount} }`)
      return res
    },
    getClient: async () => {
      const client = await pool.connect()
      const query = client.query
      const release = client.release
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        logger.error('A client has been checked out for more than 5 seconds!')
        logger.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000)
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args
        return query.apply(client, args)
      }
      client.release = () => {
        // clear our timeout
        clearTimeout(timeout)
        // set the methods back to their old un-monkey-patched version
        client.query = query
        client.release = release
        return release.apply(client)
      }
      return client
    }
  }
}

module.exports.makePgInstance = makePgInstance
