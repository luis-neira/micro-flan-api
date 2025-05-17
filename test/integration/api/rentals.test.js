"use strict";

const chai = require("chai");
const request = require("supertest");
const app = require("../../../src/app");

describe("GET /rentals", () => {
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

describe("PATCH /rentals", () => {
  it("edit rental by ID", (done) => {
    const newData = {
      id: 6,
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
      .patch("/rentals/6")
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

describe("DELETE /rentals", () => {
  it("delete rental by ID", (done) => {
    request(app)
      .delete("/rentals/6")
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
