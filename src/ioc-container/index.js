"use strict";

const awilix = require("awilix");
const makeRentalRepo = require("../repos/rental");
const makeTenantRepo = require("../repos/tenant");
const makeKnexInstance = require("../db/instance");

const { asFunction, asValue, createContainer, Lifetime, InjectionMode } =
  awilix;

const awilixContainer = createContainer();

awilixContainer.register({
  nodeEnv: asValue(process.env.NODE_ENV),
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

module.exports = awilixContainer;
