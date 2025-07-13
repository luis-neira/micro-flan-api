'use strict'

function getRentalTenants ({ db }) {
  return (id) => {
    // return db.select('*').from('tenants').where({ rental_id: id })
    const result = db.raw('SELECT * FROM tenants WHERE rental_id = ?', [id])

    return result.rows || result
  }
}

module.exports = getRentalTenants
