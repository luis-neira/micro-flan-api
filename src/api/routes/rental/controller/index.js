'use strict'

const wrapController = require('@lib/wrap-controller')
const getRentals = require('../usecase/getRental/get-rentals.controller')
const getRentalTenants = require('../usecase/getRentalTenants/get-rental-tenants.controller')
const createRental = require('../usecase/createRental/create-rental.controller')
const updateRental = require('../usecase/updateRental/update-rental.controller')
const deleteRental = require('../usecase/deleteRental/delete-rental.controller')

function makeRentalController (cradle) {
  const controller = {
    getRentals: getRentals(cradle),
    getRentalTenants: getRentalTenants(cradle),
    updateRental: updateRental(cradle),
    createRental: createRental(cradle),
    deleteRental: deleteRental(cradle)
  }

  return wrapController(controller)
}

module.exports = makeRentalController
