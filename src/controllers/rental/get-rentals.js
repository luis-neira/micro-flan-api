"use strict";

const createError = require("http-errors");

function getRentals({ rentalRepo }) {
  // TODO add middleware for validation i.e. zod
  return async (req, res, next) => {
    try {
      const { type } = req.query;

      if (type && typeof type !== "string") {
        return next(createError(400));
      }

      const rentals = await rentalRepo.getRentals(type);

      res.json(rentals);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = getRentals;
