'use strict'

function createRental ({ db }) {
  return async (inputData) => {
    // const [result] = await db.insert([inputData], ['id']).into('rentals')
    // const { id } = result

    const keys = Object.keys(inputData)
    const values = Object.values(inputData)

    // Create placeholders for the values
    // const placeholders = keys.map(() => '?').join(', ')
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ')

    // Build the raw SQL
    const sql = `INSERT INTO rentals(${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`
    const result = await db.query(sql, values)
    // const [rental] = result.rows || result
    const [rental] = result.rows

    // return db.first().from('rentals').where({ id })
    // return db.query("SELECT * FROM rentals WHERE id = ?", [rental.id])
    return rental
  }
}

module.exports = createRental
