"use strict";

const request = require("supertest");
const chai = require("chai");

const buildExpressApp = require("../../../src/app");
const { getContainer } = require("../../../src/ioc-container");

const awilixContainer = getContainer();
const config = awilixContainer.resolve("config");

const app = buildExpressApp(config);

describe("POST /auth/login", () => {
  it("returns a valid token", (done) => {
    request(app)
      .post("/auth/login")
      .send({
        username: "admin",
        password: "password123",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.have.property("token");
        done();
      });
  });
});
