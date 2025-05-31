"use strict";

const getRentals = require("./get-rentals");
const getRentalTenants = require("./get-rental-tenants");
const createRental = require("./create-rental");
const updateRental = require("./update-rental");
const deleteRental = require("./delete-rental");

function makeRentalController(cradle) {
  return {
    getRentals: getRentals(cradle),
    getRentalTenants: getRentalTenants(cradle),
    createRental: createRental(cradle),
    updateRental: updateRental(cradle),
    deleteRental: deleteRental(cradle),
  };
}

module.exports = makeRentalController;
