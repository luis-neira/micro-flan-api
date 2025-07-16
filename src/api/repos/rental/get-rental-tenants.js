'use strict'

function getRentalTenants ({ db }) {
  return async (id) => {
    // return db.select('*').from('tenants').where({ rental_id: id })
    const result = await db.raw('SELECT * FROM tenants WHERE rental_id = ?', [id])

    // return result.rows || result
    return result.rows
  }
}

module.exports = getRentalTenants
