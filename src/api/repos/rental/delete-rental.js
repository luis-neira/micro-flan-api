'use strict'

function updateRental ({ db }) {
  return (id) => {
    return db('rentals').where({ id }).del()
  }
}

module.exports = updateRental
