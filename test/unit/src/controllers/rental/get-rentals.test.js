const chai = require('chai')
const sinon = require('sinon')
const makeRentalController = require('@api/routes/rental/controller')
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

    const rentalController = makeRentalController({ rentalRepo: mock })

    await rentalController.getRentals(req, res)

    expect(res.json.calledWith(fakeRentals)).to.equal(true)
  })
})
