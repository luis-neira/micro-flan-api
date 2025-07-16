'use strict'

function updateRental ({ db }) {
  return async (id) => {
    // return db('rentals').where({ id }).del()
    const result = await db.raw('DELETE FROM rentals WHERE id = ?', [id])

    // return result.rowCount || result.changes
    return result.rowCount
  }
}

module.exports = updateRental
