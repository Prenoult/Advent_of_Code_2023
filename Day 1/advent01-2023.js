// part #1
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

console.log('input size: ', input.length)

const calculateCalibrationValueForLine = (line) => {
  const lineArray = line.split('');
  const firstInt = lineArray.find((char) => parseInt(char))
  const lastInt = lineArray.reverse().find((char) => parseInt(char))
  if (!firstInt || !lastInt) {
    return 0
  }
  return parseInt(firstInt + lastInt)
}

const res = input.reduce((acc, line) => {
  return acc + calculateCalibrationValueForLine(line)
}, 0)

// export result in file
fs.writeFileSync('output.txt', res.toString(), 'utf8');

// part #2

// constants
const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const numbersAsArray = numbers.map((number) => number.split(''))
const numbersAsArrayReversed = numbers.map((number) => number.split('').reverse())

const getFirstNumber = (subs, arr, fromEnd) => {
  let firstNumber = null
  let firstIndex = Infinity
  let newArr = arr

  if (fromEnd) {
    newArr = arr.reverse()
  }

  newArr.find((curr, i) => {
    if (parseInt(curr)) {
      firstIndex = i
      firstNumber = curr
      return true
    }

    return false
  })

  subs.forEach((sub) => {
    arr.some((_, i) => {
      if (sub.every((currSub, j) => arr[i + j] === currSub)) {
        if (i < firstIndex) {
          firstIndex = i
          firstNumber = sub
        }

        return true
      }

      return false
    })
  })

  if (typeof firstNumber !== 'string') return subs.indexOf(firstNumber) + 1

  return firstNumber
}


const calculateCalibrationValueForLineUpdated = (line) => {
  const lineArray = line.split('');
  const firstNumber = getFirstNumber(numbersAsArray, lineArray)
  const lastNumber = getFirstNumber(numbersAsArrayReversed, lineArray, true)
  if (!firstNumber || !lastNumber) {
    return 0
  }
  return parseInt(firstNumber.toString() + lastNumber.toString())
}

const res2 = input.reduce((acc, line) => {
  return acc + calculateCalibrationValueForLineUpdated(line)
}, 0)

fs.writeFileSync('output2.txt', res2.toString(), 'utf8');
