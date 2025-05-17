"use strict";

const getTenants = require("./get-tenants");

function createTenantsController(tenantRepo) {
  return {
    getTenants: getTenants({ tenantRepo }),
  };
}

module.exports = createTenantsController;
