'use strict'

function updateRental ({ db }) {
  return (id, rental) => {
    return db('rentals').where({ id }).update(rental, ['*'])
  }
}

module.exports = updateRental
