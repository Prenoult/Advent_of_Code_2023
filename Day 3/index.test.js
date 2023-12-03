const { isSpecialChar, getEveryAdjacentCoordinates } = require('./index')

test(".", () => {
  expect(isSpecialChar(".")).toBe(false);
})

test("[0,0]", () => {
  expect(getEveryAdjacentCoordinates([0, 0])).toEqual([
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ]);
})

test("[149,149]", () => {
  expect(getEveryAdjacentCoordinates([149, 149])).toEqual([
    [148, 148], [148, 149], [148, 150],
    [149, 148], [149, 150],
    [150, 148], [150, 149], [150, 150]
  ]);
})