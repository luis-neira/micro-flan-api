const chai = require('chai')
const sinon = require('sinon')
const getRentalsController = require('@api/routes/rental/usecase/getRental/get-rentals.controller')
const { expect } = chai

// TODO fix spies, stubs & mocks
describe("rental-controller: 'getRentals'", () => {
  it('should return rentals', async () => {
    const fakeRentals = [{ id: 1 }, { id: 2 }]

    const fake = sinon.fake.resolves(fakeRentals)

    const req = {
      query: {}
    }
    const res = {
      json: sinon.spy()
    }

    const rentalController = getRentalsController({ getRentalsRepository: fake })

    await rentalController(req, res)

    expect(res.json.calledWith(fakeRentals)).to.equal(true)
  })
})
