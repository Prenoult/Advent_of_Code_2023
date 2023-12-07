const {
  getHandAndBid,
  getHandType,
  compareHands,
  compareHands2,
  getTotalWinnings,
  getTotalWinnings2
} = require('./index');
const fs = require('fs');
const input = fs.readFileSync('./Day 7/input_test.txt', { encoding: 'utf-8' }).split('\n');

const inputProcessed = input.map((input) => getHandAndBid(input));

test('AAAAA is 6', () => {
  expect(getHandType('AAAAA')).toBe(6);
});

test('AA8AA is 5', () => {
  expect(getHandType('AA8AA')).toBe(5);
});

test('23332 is 4', () => {
  expect(getHandType('23332')).toBe(4);
});

test('TTT98 is 3', () => {
  expect(getHandType('TTT98')).toBe(3);
});

test('23432 is 2', () => {
  expect(getHandType('23432')).toBe(2);
});

test('A23A4 is 1', () => {
  expect(getHandType('A23A4')).toBe(1);
});

test('23456 is 0', () => {
  expect(getHandType('23456')).toBe(0);
});

test('KK677 > KTJJT', () => {
  expect(compareHands('KTJJT', 'KK677')).toBe(-1);
});

test('T55J5 < KTJJT', () => {
  expect(compareHands2('T55J5', 'KTJJT')).toBe(-1);
});

test('Example result', () => {
  expect(getTotalWinnings(inputProcessed)).toBe(6440);
})

test('Example result part2', () => {
  expect(getTotalWinnings2(inputProcessed)).toBe(5905);
})