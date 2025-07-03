"use strict";

const chai = require("chai");
const request = require("supertest");
const initExpressApp = require("../../../src/app");
const getContainer = require("../../../src/ioc-container");

const awilixContainer = getContainer();
const knex = awilixContainer.resolve("db");
const config = awilixContainer.resolve("config");

const app = initExpressApp(config);

describe("GET /rentals", () => {
  before(async function () {
    await knex.migrate.latest();
    await knex.seed.run();
    return;
  });

  after(async function () {
    knex.migrate.rollback({}, true);
    return;
  });

  it("gets all rentals", (done) => {
    request(app)
      .get("/rentals")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.be.a("array");
        chai.expect(res.body.length).to.be.eql(5);

        done();
      });
  });

  it("gets all house rentals", (done) => {
    request(app)
      .get("/rentals")
      .query({ type: "house" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.be.a("array");
        chai.expect(res.body.length).to.be.eql(2);
        for (const rental of res.body) {
          chai.expect(rental).to.have.property("property_type", "house");
        }

        done();
      });
  });

  it("gets all apartment rentals", (done) => {
    request(app)
      .get("/rentals")
      .query({ type: "apartment" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.be.a("array");
        chai.expect(res.body.length).to.be.eql(3);
        for (const rental of res.body) {
          chai.expect(rental).to.have.property("property_type", "apartment");
        }

        done();
      });
  });
});

describe("POST /rentals", () => {
  before(async function () {
    await knex.migrate.latest();
    await knex.seed.run();
    return;
  });

  after(async function () {
    knex.migrate.rollback({}, true);
    return;
  });

  it("add rental", (done) => {
    request(app)
      .post("/rentals")
      .send({
        title: "Student Studio",
        location: "Paris, FR",
        price: 900,
        bedrooms: 1,
        bathrooms: 1,
        property_type: "apartment",
        description:
          "Small but functional studio, great for students or holidays in France's capital !",
        image: "https://www.example.com/student-studio.jpg",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.be.eql({
          id: 6,
          title: "Student Studio",
          location: "Paris, FR",
          price: 900,
          bedrooms: 1,
          bathrooms: 1,
          property_type: "apartment",
          description:
            "Small but functional studio, great for students or holidays in France's capital !",
          image: "https://www.example.com/student-studio.jpg",
        });

        done();
      });
  });
});

describe("PATCH /rentals/:id", () => {
  before(async function () {
    await knex.migrate.latest();
    await knex.seed.run();
    return;
  });

  after(async function () {
    knex.migrate.rollback({}, true);
    return;
  });

  it("edit rental by ID", (done) => {
    const id = 5;

    const newData = {
      id,
      title: "Student Studio",
      location: "Paris, FR",
      price: 900,
      bedrooms: 1,
      bathrooms: 1,
      property_type: "apartment",
      description:
        "Small but VERY VERY functional studio, great for students or holidays in France's capital !",
      image: "https://www.example.com/student-studio.jpg",
    };

    request(app)
      .patch(`/rentals/${id}`)
      .send(newData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.be.eql(newData);

        done();
      });
  });
});

describe("DELETE /rentals/:id", () => {
  before(async function () {
    await knex.migrate.latest();
    await knex.seed.run();
    return;
  });

  after(async function () {
    knex.migrate.rollback({}, true);
    return;
  });

  it("delete rental by ID", (done) => {
    request(app)
      .delete("/rentals/5")
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it("return error if rental does not exist", (done) => {
    request(app)
      .delete("/rentals/1000")
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });
});

describe("GET /rentals/1/tenants", () => {
  before(async function () {
    await knex.migrate.latest();
    await knex.seed.run();
    return;
  });

  after(async function () {
    knex.migrate.rollback({}, true);
    return;
  });

  it("gets all tenents per rental", (done) => {
    request(app)
      .get("/rentals/1/tenants")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        chai.expect(res.body).to.be.a("array");
        chai.expect(res.body.length).to.be.eql(2);
        for (const rental of res.body) {
          chai.expect(rental).to.have.property("rental_id", 1);
        }

        done();
      });
  });
});
