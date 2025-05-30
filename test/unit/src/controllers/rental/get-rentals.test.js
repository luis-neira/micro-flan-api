const { expect } = require("chai");
const sinon = require("sinon");
const getRentals = require("../../../../../src/controllers/rental/get-rentals");

describe("rental-controller: 'getRentals'", () => {
  it("should return rentals", async () => {
    const fakeRentals = [{ id: 1 }, { id: 2 }];

    const fake = sinon.fake.resolves(fakeRentals);

    const mock = {
      getRentals: fake,
    };

    const req = {
      query: {},
    };
    const res = {
      json: sinon.spy(),
    };

    await getRentals({ rentalRepo: mock })(req, res);

    expect(res.json.calledWith(fakeRentals)).to.be.true;
  });
});
