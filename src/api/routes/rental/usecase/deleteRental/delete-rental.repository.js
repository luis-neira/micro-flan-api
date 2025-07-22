'use strict'

function updateRental ({ db }) {
  return async (id) => {
    // return db('rentals').where({ id }).del()
    const result = await db.query('DELETE FROM rentals WHERE id = $1', [id])

    // return result.rowCount || result.changes
    return result.rowCount
  }
}

module.exports = updateRental
