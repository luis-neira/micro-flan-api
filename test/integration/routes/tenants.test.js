"use strict";

const chai = require("chai");
const request = require("supertest");
const initExpressApp = require("../../../src/app");
const getContainer = require("../../../src/ioc-container");

const awilixContainer = getContainer();
const knex = awilixContainer.resolve("db");
const config = awilixContainer.resolve("config");

const app = initExpressApp(config);

describe("GET /tenants", () => {
  before(async function () {
    await knex.migrate.latest();
    await knex.seed.run();
    return;
  });

  after(async function () {
    knex.migrate.rollback({}, true);
    return;
  });

  it("gets all tenants", (done) => {
    request(app)
      .get("/tenants")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.be.a("array");
        chai.expect(res.body.length).to.be.eql(4);

        done();
      });
  });
});
