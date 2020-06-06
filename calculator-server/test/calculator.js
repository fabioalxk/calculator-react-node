const axios = require("axios");
const chai = require("chai");
var expect = chai.expect;
const assert = chai.assert;

describe("Calculate equation", () => {
  it("should calculate the equation and return a JSON object with the result", async () => {
    const response = await axios.post(`http://localhost:5000/calculator`, {
      equation: "5 * 2 + 10 - 5",
    });

    // expect(response.data.result).toBe(15);
    assert.equal(response.data.result, 15);
  });
});

describe("Divide by 0", () => {
  it("should calculate the equation and return a JSON object with null as the result", async () => {
    const response = await axios.post(`http://localhost:5000/calculator`, {
      equation: "5 / 0",
    });

    assert.equal(response.data.result, null);
  });
});
