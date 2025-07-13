'use strict'

function createRental ({ db }) {
  return async (inputData) => {
    // const [id] = await db.insert(inputData).into('rentals')

    const keys = Object.keys(inputData)
    const values = Object.values(inputData)

    // Create placeholders for the values
    const placeholders = keys.map(() => '?').join(', ')

    // Build the raw SQL
    const sql = `INSERT INTO rentals(${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`
    const result = await db.raw(sql, values)
    const [rental] = result.rows || result
    // const [id] = await db.raw(sql, values);

    // return db.first().from('rentals').where({ id })
    // return db.raw("SELECT * FROM rentals WHERE id = ?", [rental.id])
    return rental
  }
}

module.exports = createRental
