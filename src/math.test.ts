import { fibonacci } from "./math";

describe("fibonacci", () => {
  it.each`
    n    | expected
    ${0} | ${0}
    ${1} | ${1}
    ${3} | ${2}
  `("fibonacci($n) = $expected", ({ n, expected }) => {
    const result = fibonacci(n);

    expect(result).toBe(expected);
  });

  it("throws error for negative numbers", () => {
    expect(() => fibonacci(-1)).toThrow(
      "n must be greater than or equal to 0, received -1"
    );
  });
});
