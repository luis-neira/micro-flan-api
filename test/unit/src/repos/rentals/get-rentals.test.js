const sinon = require('sinon')
const chai = require('chai')
const makeRentalRepository = require('@api/routes/rental/repository')
const { expect } = chai

describe("rental-repository: 'getRentals'", () => {
  it('should call db methods and return results (manual stubs)', async () => {
    const db = {
      query: sinon.stub().resolves({
        rows: [{ id: 1, property_type: 'apartment' }]
      })
    }

    const rentalRepository = makeRentalRepository({ db })

    const result = await rentalRepository.getRentals('apartment')

    expect(db.query.calledOnce).to.equal(true)
    expect(result).to.deep.equal([{ id: 1, property_type: 'apartment' }])
  })
})
