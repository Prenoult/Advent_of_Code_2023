const { getCubesFromGame } = require('./index')

test('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', () => {
  expect(getCubesFromGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'))
    .toEqual({ "red": 4, "green": 2, "blue": 6 })
})

test('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', () => {
  expect(getCubesFromGame('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'))
    .toEqual({ "red": 1, "green": 3, "blue": 4 })
})

test('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', () => {
  expect(getCubesFromGame('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'))
    .toEqual({ "red": 20, "green": 13, "blue": 6 })
})

test('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', () => {
  expect(getCubesFromGame('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'))
    .toEqual({ "red": 14, "green": 3, "blue": 15 })
})

test('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', () => {
  expect(getCubesFromGame('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'))
    .toEqual({ "red": 6, "green": 3, "blue": 2 })
})

test('Game 54: 2 red, 4 green, 16 blue; 4 blue, 3 red, 8 green; 4 blue, 2 red, 6 green', () => {
  expect(getCubesFromGame('Game 50: 2 red, 4 green, 16 blue; 4 blue, 3 red, 8 green; 4 blue, 2 red, 6 green'))
    .toEqual({ "red": 3, "green": 8, "blue": 16 })
})