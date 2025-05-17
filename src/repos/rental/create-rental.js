"use strict";

function createRental({ db }) {
  return async (inputData) => {
    const [id] = await db.insert(inputData).into("rentals");

    return db.first().from("rentals").where({ id });
  };
}

module.exports = createRental;
