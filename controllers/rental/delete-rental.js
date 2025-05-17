"use strict";

const createError = require("http-errors");

function deleteRental({ rentalRepo }) {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        return next(createError(400));
      }

      const result = await rentalRepo.deleteRental(parsedId);

      if (result === 0) {
        return next(createError(404));
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = deleteRental;
