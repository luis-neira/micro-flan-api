"use strict";

const createError = require("http-errors");

function updateRental({ rentalRepo }) {
  return async (req, res, next) => {
    try {
      const rental = req.body;
      const { id } = req.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        return next(createError(400));
      }

      const [updatedRental] = await rentalRepo.updateRental(id, rental);

      if (updatedRental == null) {
        return next(createError(404));
      }

      res.json(updatedRental);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = updateRental;
