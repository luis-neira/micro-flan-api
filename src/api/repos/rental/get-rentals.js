'use strict'

function getRentals ({ db }) {
  return (type) => {
    if (type === 'house' || type === 'apartment') {
      return db.select().from('rentals').where({ property_type: type })
    }

    return db.select().from('rentals')
  }
}

module.exports = getRentals
