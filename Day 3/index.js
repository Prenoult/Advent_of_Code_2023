const fs = require('fs');
const input = fs.readFileSync('./Day 3/input.txt', 'utf8').split('\n');
input.pop();

const matrix = input.map((row) => row.split(''));

const isSpecialChar = (char) => {
  const regex = /[^A-Za-z0-9.]/;
  return regex.test(char);
}

const isNumber = (char) => {
  const regex = /[0-9]/;
  return regex.test(char);
}

const getEverySpecialCharCoordinates = (matrix) => {
  const specialCharCoordinates = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((char, charIndex) => {
      if (isSpecialChar(char)) {
        specialCharCoordinates.push([rowIndex, charIndex]);
      }
    })
  })
  return specialCharCoordinates;
}

const getEveryNumberCoordinatesWithNumber = (matrix) => {
  const numberCoordinates = [];
  matrix.forEach((row, rowIndex) => {
    let number = '';
    let currentNumberCoordinates = [];
    row.forEach((char, charIndex) => {
      if (isNumber(char)) {
        number += char;
        currentNumberCoordinates.push([rowIndex, charIndex]);
        if (charIndex === row.length - 1) {
          numberCoordinates.push([currentNumberCoordinates, number]);
        }
      } else {
        if (number !== '') {
          numberCoordinates.push([currentNumberCoordinates, number]);
          number = '';
          currentNumberCoordinates = [];
        }
      }
    })
  })
  return numberCoordinates;
}

const getEveryAdjacentCoordinates = (coordinates) => {
  const [row, column] = coordinates;
  return [
    [row - 1, column - 1], [row - 1, column], [row - 1, column + 1],
    [row, column - 1], [row, column + 1],
    [row + 1, column - 1], [row + 1, column], [row + 1, column + 1]
  ];
}

const everySpecialCharCoordiantes = getEverySpecialCharCoordinates(matrix);
const everyNumberCoordinatesWithNumbers = getEveryNumberCoordinatesWithNumber(matrix);

const getEveryNumbersAdjacentToSpecialChar = (
  specialCharCoordinates,
  numberCoordinatesWithNumbers
) => {
  const numbersAdjacentToSpecialChar = [];
  numberCoordinatesWithNumbers.forEach((numberCoordinatesWithNumber) => {
    const numberMultipleCoordinates = numberCoordinatesWithNumber[0]
    numberMultipleCoordinates.forEach((numberCoordinate) => {
      const adjacentCoordinates = getEveryAdjacentCoordinates(numberCoordinate);
      adjacentCoordinates.forEach((adjacentCoordinate) => {
        if (specialCharCoordinates.some((specialCharCoordinate) => {
          const [adjacentRow, adjacentColumn] = adjacentCoordinate;
          const [specialCharRow, specialCharColumn] = specialCharCoordinate;
          return adjacentRow === specialCharRow && adjacentColumn === specialCharColumn;
        })) {
          if (!numbersAdjacentToSpecialChar.includes(numberCoordinatesWithNumber)) {
            numbersAdjacentToSpecialChar.push(numberCoordinatesWithNumber);
          }
        }
      })
    })
  })
  return numbersAdjacentToSpecialChar;
}

const everyNumbersAdjacentToSpecialChar = getEveryNumbersAdjacentToSpecialChar(
  everySpecialCharCoordiantes,
  everyNumberCoordinatesWithNumbers
)

const res = everyNumbersAdjacentToSpecialChar.reduce((acc, numberAdjacent) => {
  return acc + parseInt(numberAdjacent[1]);
}, 0);
fs.writeFileSync('./Day 3/output.txt', res.toString(), 'utf8');

// part #2
const isStar = (char) => {
  return char === '*';
}

const getGearsCoordinates = (matrix) => {
  const gearsCoordinates = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((char, charIndex) => {
      if (isStar(char)) {
        gearsCoordinates.push([rowIndex, charIndex]);
      }
    })
  })
  return gearsCoordinates;
}

const getGearsNumbersForRatio = (gearCoordinates, numberCoordinatesWithNumbers) => {
  const numbersAdjacentToGears = [];
  gearCoordinates.forEach((gearCoordinate) => {
    const gearAdjacentCoordinates = getEveryAdjacentCoordinates(gearCoordinate);
    const numbersAdjacentToGear = [];
    numberCoordinatesWithNumbers.forEach((numberCoordinatesWithNumber) => {
      const [numberCoordinates] = numberCoordinatesWithNumber;
      gearAdjacentCoordinates.forEach((gearAdjacentCoordinate) => {
        const [gearAdjacentRow, gearAdjacentColumn] = gearAdjacentCoordinate;
        numberCoordinates.forEach((numberCoordinate) => {
          const [numberRow, numberColumn] = numberCoordinate;
          if (gearAdjacentRow === numberRow && gearAdjacentColumn === numberColumn) {
            if (!numbersAdjacentToGear.includes(numberCoordinatesWithNumber)) {
              numbersAdjacentToGear.push(numberCoordinatesWithNumber);
            }
          }
        })
      })
    })
    if (numbersAdjacentToGear.length === 2) {
      numbersAdjacentToGears.push(numbersAdjacentToGear);
    }
  })
  return numbersAdjacentToGears;
}

const gearsCoordinates = getGearsCoordinates(matrix);

const gearsNumbersForRatio = getGearsNumbersForRatio(
  gearsCoordinates,
  everyNumberCoordinatesWithNumbers
)

const gearsRatios = gearsNumbersForRatio.map((gearNumbersForRatio) => {
  return gearNumbersForRatio[0][1] * gearNumbersForRatio[1][1];
})

const sumGearsRatios = gearsRatios.reduce((acc, gearRatio) => {
  return acc + gearRatio;
}, 0);

fs.writeFileSync('./Day 3/output2.txt', sumGearsRatios.toString(), 'utf8');

module.exports = { isSpecialChar, getEveryAdjacentCoordinates };
