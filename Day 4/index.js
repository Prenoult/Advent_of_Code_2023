const fs = require('fs');
const input = fs.readFileSync('./Day 4/input.txt', 'utf8').split('\n');
const input_test = fs.readFileSync('./Day 4/input_test.txt', 'utf8').split('\n');
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

// part #2
const getMatchingNumbersFromRow = (row) => {
  const winningNumbers = getNumbersFromString(splitNumbers(removeLabel(row))[0]);
  const numbersIHave = getNumbersFromString(splitNumbers(removeLabel(row))[1]);
  return numbersIHave.reduce((acc, number) => {
    if (winningNumbers.includes(number)) {
      return acc + 1
    }
    return acc
  }, 0);
}

const getWonScratchCards = (row, index) => {
  const pointsFromRow = getMatchingNumbersFromRow(row)
  const arr = [];
  for (let i = 0; i < pointsFromRow; i++) {
    arr.push(index + 1 + i);
  }
  return arr
}


const createInputWithCopiedCards = (input) => {
  const inputWhichWillMutate = [...input];
  for (let i = 0; i < inputWhichWillMutate.length; i++) {
    const row = inputWhichWillMutate[i];
    const realIndex = input.findIndex((element) => element === row)
    const wonScratchcards = getWonScratchCards(row, realIndex);
    if (wonScratchcards.length > 0) {
      wonScratchcards.forEach((card) => {
        inputWhichWillMutate.push(input[card])
      })
    }
  }
  return inputWhichWillMutate
}

const res2 = createInputWithCopiedCards(input).length
fs.writeFileSync('./Day 4/output2.txt', res2.toString());

module.exports = { getPointsFromRow, getWonScratchCards, createInputWithCopiedCards };