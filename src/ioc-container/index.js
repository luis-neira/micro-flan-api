"use strict";

const awilix = require("awilix");
const makeRentalRepo = require("../repos/rental");
const makeTenantRepo = require("../repos/tenant");
const makeKnexInstance = require("../db/instance");
const config = require("../config");

const { asFunction, asValue, createContainer, Lifetime, InjectionMode } =
  awilix;

let awilixContainer;

function getContainer() {
  if (!awilixContainer) {
    awilixContainer = createContainer();
  }
  
  awilixContainer.register({
    dbEnv: asValue(config.dbEnv),
    db: asFunction(makeKnexInstance, {
      lifetime: Lifetime.SINGLETON,
      injectionMode: InjectionMode.CLASSIC,
      dispose: (knex) => knex.destroy(),
    }),
    rentalRepo: asFunction(makeRentalRepo, {
      lifetime: Lifetime.SINGLETON,
    }),
    tenantRepo: asFunction(makeTenantRepo, {
      lifetime: Lifetime.SINGLETON,
    }),
  });

  return awilixContainer;
}

module.exports = getContainer;
