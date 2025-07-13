'use strict'

const assert = require('node:assert')
const requestTime = require('@api/middleware/timer')

describe("middleware: 'requestTime'", () => {
  it("should add a 'requestTime' property to the 'req' parameter", () => {
    const req = {}
    requestTime(req, null, () => {})

    assert.ok(req.requestTime > 0)
  })
})
