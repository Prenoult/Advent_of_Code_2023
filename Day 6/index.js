const fs = require('fs');
const input = fs.readFileSync('./Day 6/input.txt', 'utf8').split('\n');
input.pop();

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
  const [time, distance] = curr;
  if (acc === 0) {
    return getNumberOfWins(time, distance);
  }
  return acc * getNumberOfWins(time, distance);
}, 0)

fs.writeFileSync('./Day 6/output.txt', res.toString(), 'utf8');

// part #2
const getTimeWithDistanceForOne = (input) => {
  const times = input[0].replace(/^.*: /, '').split(' ').filter((element) => element !== '');
  const distances = input[1].replace(/^.*: /, '').split(' ').filter((element) => element !== '');
  const time = parseInt(times.reduce((acc, curr) => {
    return acc + curr;
  }))
  const distance = parseInt(distances.reduce((acc, curr) => {
    return acc + curr;
  }))
  return [time, distance];
}

const timeWithDistanceForOne = getTimeWithDistanceForOne(input);
const res2 = getNumberOfWins(timeWithDistanceForOne[0], timeWithDistanceForOne[1]);
fs.writeFileSync('./Day 6/output2.txt', res2.toString(), 'utf8');
