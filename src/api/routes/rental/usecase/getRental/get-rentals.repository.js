'use strict'

function getRentals ({ db }) {
  return async (type) => {
    if (type === 'house' || type === 'apartment') {
      // return db.select().from('rentals').where({ property_type: type })
      const result = await db.query('SELECT * FROM rentals WHERE property_type = $1', [type])

      // return result.rows || result
      return result.rows
    }

    // return db.select().from('rentals')
    const result = await db.query('SELECT * FROM rentals')

    // return result.rows || result
    return result.rows
  }
}

module.exports = getRentals
