'use strict'

const knex = require('knex')
const getKnexfile = require('../../../knexfile')

// TODO: use PG instead
function makeKnexInstance (config) {
  let instance = null

  if (!instance) {
    const knexfile = getKnexfile(config)
    instance = knex(knexfile[config.dbEnv])
  }

  return instance
}

const pg = require('pg')

function makePgInstance (config) {
  let pool = null

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
      console.log('executed query', { text, duration: `${duration}ms`, rows: res.rowCount })
      return res
    },
    getClient: async () => {
      const client = await pool.connect()
      const query = client.query
      const release = client.release
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
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

module.exports = makeKnexInstance
module.exports.makePgInstance = makePgInstance
