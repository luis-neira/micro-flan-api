'use strict'

const getRentals = require('../usecase/getRental/get-rentals.repository')
const getRentalTenants = require('../usecase/getRentalTenants/get-rental-tenants.repository')
const createRental = require('../usecase/createRental/create-rental.repository')
const updateRental = require('../usecase/updateRental/update-rental.repository')
const deleteRental = require('../usecase/deleteRental/delete-rental.repository')

function makeRentalRepo (cradle) {
  return {
    getRentals: getRentals(cradle),
    getRentalTenants: getRentalTenants(cradle),
    createRental: createRental(cradle),
    updateRental: updateRental(cradle),
    deleteRental: deleteRental(cradle)
  }
}

module.exports = makeRentalRepo
