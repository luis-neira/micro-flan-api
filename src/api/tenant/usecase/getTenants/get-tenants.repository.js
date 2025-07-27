'use strict'

function getTenantsRepo ({ db }) {
  return async () => {
    const result = await db.query('SELECT * FROM tenants')

    return result.rows
  }
}

module.exports = getTenantsRepo
