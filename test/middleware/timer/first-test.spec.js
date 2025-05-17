"use strict";

const assert = require("node:assert");
const requestTime = require("../../../middleware/timer");

describe("requestTime middleware", () => {
  it("should add a 'requestTime' property to the 'req' parameter", () => {
    const req = {};
    requestTime(req, null, () => {});

    assert.ok(req.requestTime > 0);
  });
});
