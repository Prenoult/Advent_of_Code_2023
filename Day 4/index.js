const fs = require('fs');
const input = fs.readFileSync('./Day 4/input.txt', 'utf8').split('\n');
input.pop();

const removeLabel = (row) => {
  const regexp = /^.*: /;
  return row.replace(regexp, '');
}

const splitNumbers = (row) => {
  return row.split(' | ');
}

const getNumbersFromString = (string) => {
  const numbers = string.split(' ');
  numbers.find((number, index) => {
    if (number === '') {
      numbers.splice(index, 1);
    }
  });
  return numbers;
}

const getPointsFromRow = (row) => {
  const winningNumbers = getNumbersFromString(splitNumbers(removeLabel(row))[0]);
  const numbersIHave = getNumbersFromString(splitNumbers(removeLabel(row))[1]);
  return numbersIHave.reduce((acc, number) => {
    if (winningNumbers.includes(number)) {
      if (acc === 0) {
        return 1;
      }
      return acc * 2
    }
    return acc
  }, 0);
}

const res = input.reduce((acc, row) => {
  return acc + getPointsFromRow(row);
}, 0);

fs.writeFileSync('./Day 4/output.txt', res.toString());

module.exports = { getPointsFromRow };