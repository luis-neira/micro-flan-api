"use strict";

const getTenants = require("./get-tenants");

function createTenantsController(db) {
  return {
    getTenants: getTenants({ db }),
  };
}

module.exports = createTenantsController;
