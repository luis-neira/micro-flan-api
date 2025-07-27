'use strict'

function getRentalTenantsRepo ({ db }) {
  return async (id) => {
    const result = await db.query('SELECT * FROM tenants WHERE rental_id = $1', [id])

    return result.rows
  }
}

module.exports = getRentalTenantsRepo
