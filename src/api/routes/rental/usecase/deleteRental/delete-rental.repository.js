'use strict'

function updateRental ({ db }) {
  return async (id) => {
    const result = await db.query('DELETE FROM rentals WHERE id = $1', [id])

    return result.rowCount
  }
}

module.exports = updateRental
