'use strict'

function updateRentalRepo ({ db }) {
  return async (id, rental) => {
    const keys = Object.keys(rental)
    const values = Object.values(rental)

    // Build the SET clause dynamically
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ')

    // Build the SQL
    const idPlaceholder = `$${keys.length + 1}`

    const sql = `UPDATE rentals SET ${setClause} WHERE id = ${idPlaceholder} RETURNING *`

    // Append recordId to values (for the WHERE clause)
    const params = [...values, id]

    const result = await db.query(sql, params)

    return result.rows
  }
}

module.exports = updateRentalRepo
