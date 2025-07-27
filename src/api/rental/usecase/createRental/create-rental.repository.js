'use strict'

function createRentalRepo ({ db }) {
  return async (inputData) => {
    const keys = Object.keys(inputData)
    const values = Object.values(inputData)

    // Create placeholders for the values
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ')

    // Build the raw SQL
    const sql = `INSERT INTO rentals(${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`
    const result = await db.query(sql, values)
    const [rental] = result.rows

    return rental
  }
}

module.exports = createRentalRepo
