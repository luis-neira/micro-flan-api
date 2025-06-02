"use strict";

const chai = require("chai");
const sinon = require("sinon");
const createError = require("http-errors");

const authenticateToken = require("../../../../../src/middleware/authenticate-token");
const { expect } = chai;

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NDYwMzEwODV9.qFR1BJvk1LFgMP61eXu4HBnvyUrum1DgVV55AJnvLJs";

describe("middleware: 'authenticateToken'", () => {
  it("should pass validation", (done) => {
    const req = {
      headers: {
        authorization: `bearer ${TOKEN}`,
      },
    };

    const next = (err) => {
      expect(err).to.be.undefined;
      expect(req).to.have.property("user");
      done();
    };

    authenticateToken(req, null, next);
  });

  it("should fail validation: 401", (done) => {
    const req = {
      headers: {
        authorization: " ",
      },
    };

    const mockNext = sinon.fake();

    authenticateToken(req, null, mockNext);

    expect(mockNext.args[0][0]).to.deep.equal(createError(401));
    done();
  });

  it("should fail validation: 403", (done) => {
    const req = {
      headers: {
        authorization: `bearer dkfsfhskfhskdjfh`,
      },
    };

    const mockNext = sinon.fake();

    authenticateToken(req, null, mockNext);

    expect(mockNext.args[0][0]).to.deep.equal(createError(403));
    done();
  });
});
