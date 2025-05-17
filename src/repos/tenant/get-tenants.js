"use strict";

function getTenants({ db }) {
  return () => {
    return db.select().from("tenants");
  };
}

module.exports = getTenants;
