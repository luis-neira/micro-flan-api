const fs = require("node:fs");
const path = require("node:path");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear existing data
  await knex("tenants").del();
  await knex("rentals").del();

  // Load JSON
  const dataPath = path.resolve("data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  // Insert rentals first
  await knex("rentals").insert(data.rentals);

  // Then tenants
  await knex("tenants").insert(data.tenants);
};
