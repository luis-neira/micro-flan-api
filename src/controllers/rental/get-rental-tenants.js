"use strict";

const createError = require("http-errors");

function getRentalTenants({ rentalRepo }) {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      const sanitized_id = Number(id);

      if (Number.isNaN(sanitized_id)) {
        return next(createError.BadRequest());
      }

      const tenants = await rentalRepo.getRentalTenants(sanitized_id);

      res.json(tenants);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = getRentalTenants;
