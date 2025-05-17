"use strict";

class RentalRepo {
  constructor(db) {
    this.db = db;
  }

  getRentals(type) {
    if (type === "house" || type == "apartment") {
      return this.db.select().from("rentals").where({ property_type: type });
    }

    return this.db.select().from("rentals");
  }

  getRentalTenants(id) {
    return this.db.select("*").from("tenants").where({ rental_id: id });
  }

  async createRental(inputData) {
    const [id] = await this.db.insert(inputData).into("rentals");

    return this.db.first().from("rentals").where({ id });
  }

  updateRental(id, rental) {
    return this.db("rentals").where({ id }).update(rental, ["*"]);
  }

  deleteRental(id) {
    return this.db("rentals").where({ id }).del();
  }
}

module.exports = RentalRepo;
