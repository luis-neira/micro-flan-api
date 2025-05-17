"use strict";

function getRentalTenants({ db }) {
  return (id) => {
    return db.select("*").from("tenants").where({ rental_id: id });
  };
}

module.exports = getRentalTenants;
