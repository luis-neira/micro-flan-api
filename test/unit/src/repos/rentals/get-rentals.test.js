const sinon = require('sinon')
const chai = require('chai')
const makeRentalRepository = require('@api/routes/rental/repository')
const { expect } = chai

describe("rental-repository: 'getRentals'", () => {
  it('should call db methods and return results (manual stubs)', async () => {
    const db = {
      // select: sinon.stub().returnsThis(),
      // from: sinon.stub().returnsThis(),
      // where: sinon.stub().resolves([{ id: 1, property_type: 'apartment' }])
      // raw: sinon.stub().resolves([{ id: 1, property_type: 'apartment' }])
      // raw: sinon.stub().resolves({
      //   rows: [{ id: 1, property_type: 'apartment' }]
      // })
      query: sinon.stub().resolves({
        rows: [{ id: 1, property_type: 'apartment' }]
      })
    }

    const rentalRepository = makeRentalRepository({ db })

    // const result = await getRentalsByType({ db })('apartment')
    const result = await rentalRepository.getRentals('apartment')

    // expect(db.select.calledOnce).to.equal(true)
    // expect(db.from.calledWith('rentals')).to.equal(true)
    // expect(db.where.calledWith({ property_type: 'apartment' })).to.equal(true)
    expect(db.query.calledOnce).to.equal(true)
    expect(result).to.deep.equal([{ id: 1, property_type: 'apartment' }])
  })
})
