const sinon = require('sinon')
const chai = require('chai')
const getRentalsRepository = require('@api/rental/usecase/getRental/get-rentals.repository')
const { expect } = chai

describe("rental-repository: 'getRentals'", () => {
  it('should call db methods and return results (manual stubs)', async () => {
    const db = {
      query: sinon.stub().resolves({
        rows: [{ id: 1, property_type: 'apartment' }]
      })
    }

    const rentalRepository = getRentalsRepository({ db })

    const result = await rentalRepository('apartment')

    expect(db.query.calledOnce).to.equal(true)
    expect(result).to.deep.equal([{ id: 1, property_type: 'apartment' }])
  })
})
