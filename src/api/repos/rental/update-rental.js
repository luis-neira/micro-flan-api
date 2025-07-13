'use strict'

function updateRental ({ db }) {
  return async (id, rental) => {
    // return db('rentals').where({ id }).update(rental, ['*'])

    const keys = Object.keys(rental)
    const values = Object.values(rental)

    // Build the SET clause dynamically: "title = ?, price = ?, ..."
    const setClause = keys.map(key => `${key} = ?`).join(', ')

    // Build the SQL
    const sql = `UPDATE rentals SET ${setClause} WHERE id = ? RETURNING *`

    // Append recordId to values (for the WHERE clause)
    const params = [...values, id]

    const result = await db.raw(sql, params)

    return result.rows || result
  }
}

module.exports = updateRental
