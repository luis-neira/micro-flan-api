const chai = require('chai')
const sinon = require('sinon')
const getRentals = require('@api/controllers/rental/get-rentals')
const { expect } = chai

// TODO fix spies, stubs & mocks
describe("rental-controller: 'getRentals'", () => {
  it('should return rentals', async () => {
    const fakeRentals = [{ id: 1 }, { id: 2 }]

    const fake = sinon.fake.resolves(fakeRentals)

    const mock = {
      getRentals: fake
    }

    const req = {
      query: {}
    }
    const res = {
      json: sinon.spy()
    }

    await getRentals({ rentalRepo: mock })(req, res)

    expect(res.json.calledWith(fakeRentals)).to.equal(true)
  })
})
