"use strict";

const awilix = require("awilix");

const config = require("../config");
const makeRentalRepo = require("../repos/rental");
const makeTenantRepo = require("../repos/tenant");
const makeKnexInstance = require("../db/instance");

const { asFunction, asValue, createContainer, Lifetime, InjectionMode } =
  awilix;

let awilixContainer;

function getContainer() {
  if (!awilixContainer) {
    awilixContainer = createContainer();
  }
  
  awilixContainer.register({
    config: asValue(config),
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
