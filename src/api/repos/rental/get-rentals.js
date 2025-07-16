'use strict'

function getRentals ({ db }) {
  return async (type) => {
    if (type === 'house' || type === 'apartment') {
      // return db.select().from('rentals').where({ property_type: type })
      const result = await db.raw('SELECT * FROM rentals WHERE property_type = ?', [type])

      // return result.rows || result
      return result.rows
    }

    // return db.select().from('rentals')
    const result = await db.raw('SELECT * FROM rentals')

    // return result.rows || result
    return result.rows
  }
}

module.exports = getRentals
