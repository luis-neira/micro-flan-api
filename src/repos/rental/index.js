"use strict";

const getRentals = require("./get-rentals");
const getRentalTenants = require("./get-rental-tenants");
const createRental = require("./create-rental");
const updateRental = require("./update-rental");
const deleteRental = require("./delete-rental");

function createRentalRepo(db) {
  return {
    getRentals: getRentals({ db }),
    getRentalTenants: getRentalTenants({ db }),
    createRental: createRental({ db }),
    updateRental: updateRental({ db }),
    deleteRental: deleteRental({ db }),
  };
}

module.exports = createRentalRepo;
