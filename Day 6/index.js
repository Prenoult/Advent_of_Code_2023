const { time } = require('console');
const fs = require('fs');
const input = fs.readFileSync('./Day 6/input.txt', 'utf8').split('\n');
input.pop();

// console.log(input)

const getTimeWithDistance = (input) => {
  const times = input[0].replace(/^.*: /, '').split(' ').filter((element) => element !== '');
  const distances = input[1].replace(/^.*: /, '').split(' ').filter((element) => element !== '');
  const res = []
  for (let i = 0; i < times.length; i++) {
    res.push([parseInt(times[i]), parseInt(distances[i])]);
  }
  return res
}

const getNumberOfWins = (time, distance) => {
  const possibleHoldingTime = Array.from({ length: time - 1 }, (_, k) => k + 1);
  return possibleHoldingTime.map((holdingTime) => {
    const totalTimeAllowed = possibleHoldingTime.length + 1
    const timeRemaining = totalTimeAllowed - holdingTime;
    const distanceTraveled = timeRemaining * holdingTime;
    return distanceTraveled > distance;
  }).filter(element => element === true).length;
};


const timeWithDistance = getTimeWithDistance(input);
const res = timeWithDistance.reduce((acc, curr) => {
  console.log("acc : ", acc)
  const [time, distance] = curr;
  if (acc === 0) {
    return getNumberOfWins(time, distance);
  }
  return acc * getNumberOfWins(time, distance);
}, 0)

fs.writeFileSync('./Day 6/output.txt', res.toString(), 'utf8');