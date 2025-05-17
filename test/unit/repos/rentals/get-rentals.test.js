const sinon = require("sinon");
const { expect } = require("chai");
const getRentalsByType = require("../../../../src/repos/rental/get-rentals");

describe("getRentals repo", () => {
  it("should call db methods and return results (manual stubs)", async () => {
    const db = {
      select: sinon.stub().returnsThis(),
      from: sinon.stub().returnsThis(),
      where: sinon.stub().resolves([{ id: 1, property_type: "apartment" }]),
    };

    const result = await getRentalsByType({ db })("apartment");

    expect(db.select.calledOnce).to.be.true;
    expect(db.from.calledWith("rentals")).to.be.true;
    expect(db.where.calledWith({ property_type: "apartment" })).to.be.true;
    expect(result).to.deep.equal([{ id: 1, property_type: "apartment" }]);
  });
});
