'use strict'

function getTenants ({ db }) {
  return async () => {
    const result = await db.query('SELECT * FROM tenants')

    return result.rows
  }
}

module.exports = getTenants
