/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("rentals", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("location");
      table.integer("price");
      table.integer("bedrooms");
      table.integer("bathrooms");
      table.string("property_type");
      table.text("description");
      table.string("image");
    })
    .createTable("tenants", (table) => {
      table.increments("id").primary();
      table.string("firstname");
      table.string("lastname");
      table.string("email");
      table.string("password");
      table.integer("age");
      table
        .integer("rental_id")
        .unsigned()
        .references("id")
        .inTable("rentals")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tenants").dropTableIfExists("rentals");
};
