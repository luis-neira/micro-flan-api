const { expect } = require("chai");
const sinon = require("sinon");
const getRentals = require("../../../src/controllers/rental/get-rentals");
const rentalRepo = require("../../../src/repos/rental");

describe.skip("getRentals controller", () => {
  it.skip("should return rentals from repo", async () => {
    const fakeRentals = [{ id: 1 }, { id: 2 }];
    sinon.stub(rentalRepo, "getRentals").resolves(fakeRentals);

    const req = {};
    const res = {
      json: sinon.spy(),
    };

    await getRentals({ rentalRepo })(req, res);

    expect(res.json.calledWith(fakeRentals)).to.be.true;

    rentalRepo.getRentals.restore();
  });
});
