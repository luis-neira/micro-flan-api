"use strict";

const express = require("express");

const createRentalController = require("../controllers/rental");
const RentalRepo = require("../repos/rental");
const db = require("../db/instance");

const router = express.Router();
const rentalRepo = new RentalRepo(db);
const rentalController = createRentalController(rentalRepo);

router
  .route("/")
  .get(rentalController.getRentals)
  .post(rentalController.createRental);

router
  .route("/:id")
  .patch(rentalController.updateRental)
  .delete(rentalController.deleteRental);

router.route("/:id/tenants").get(rentalController.getRentalTenants);

module.exports = router;
