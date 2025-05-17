"use strict";

function getTenants({ tenantRepo }) {
  return async (req, res, next) => {
    const tenants = await tenantRepo.getTenants();

    res.json(tenants);
  };
}

module.exports = getTenants;
