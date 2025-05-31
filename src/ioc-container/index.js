"use strict";

const awilix = require("awilix");
const makeRentalRepo = require("../repos/rental");
const makeTenantRepo = require("../repos/tenant");
const db = require("../../db/instance");

const { asFunction, asValue, createContainer, Lifetime } = awilix;

const awilixContainer = createContainer();

awilixContainer.register({
  db: asValue(db),
  rentalRepo: asFunction(makeRentalRepo, {
    lifetime: Lifetime.SINGLETON,
  }),
  tenantRepo: asFunction(makeTenantRepo, {
    lifetime: Lifetime.SINGLETON,
  }),
});

module.exports = awilixContainer;
