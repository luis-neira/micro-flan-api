"use strict";

const chai = require("chai");
const request = require("supertest");
const app = require("../../../src/app");
const knex = require("../../../db/instance");

describe("GET /tenants", () => {
  before(function (done) {
    knex.migrate
      .latest()
      .then(() => knex.seed.run())
      .finally(() => done());
  });

  after(function (done) {
    knex.migrate.rollback({}, true).then(() => done());
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
