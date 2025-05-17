"use strict";

const getRentals = require("./get-rentals");
const getRentalTenants = require("./get-rental-tenants");
const createRental = require("./create-rental");
const updateRental = require("./update-rental");
const deleteRental = require("./delete-rental");

function createRentalController(rentalRepo) {
  return {
    getRentals: getRentals({ rentalRepo }),
    getRentalTenants: getRentalTenants({ rentalRepo }),
    createRental: createRental({ rentalRepo }),
    updateRental: updateRental({ rentalRepo }),
    deleteRental: deleteRental({ rentalRepo }),
  };
}

module.exports = createRentalController;
