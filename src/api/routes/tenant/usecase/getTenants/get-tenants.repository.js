'use strict'

function getTenants ({ db }) {
  return async () => {
    // return db.select().from('tenants')
    const result = await db.query('SELECT * FROM tenants')

    return result.rows
  }
}

module.exports = getTenants
