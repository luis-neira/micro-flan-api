'use strict'

function getRentalsRepo ({ db }) {
  return async (type) => {
    if (type === 'house' || type === 'apartment') {
      const result = await db.query('SELECT * FROM rentals WHERE property_type = $1', [type])

      return result.rows
    }

    const result = await db.query('SELECT * FROM rentals')

    return result.rows
  }
}

module.exports = getRentalsRepo
