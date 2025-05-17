"use strict";

function createRental({ rentalRepo }) {
  return async (req, res, next) => {
    try {
      const rental = req.body;

      const newRental = await rentalRepo.createRental(rental);

      res.status(201).json(newRental);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = createRental;
