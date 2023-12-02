const fs = require('fs');
const input = fs.readFileSync('./Day 2/input.txt', 'utf8').split('\n');

// remove last cell from input
input.pop();

const cubeColors = ["red", "green", "blue"]

const getRoundsFromGame = (game) => game.replace(/^Game \d*: /, '').split(';');

const getCubesFromRound = (round) => {
  let cubesFromRound = { "red": 0, "green": 0, "blue": 0 };
  const cubePicks = round.split(',')
  cubePicks.forEach((cubePick) => {
    const cubeColor = cubeColors.find((color) => cubePick.includes(color))
    const cubeNumber = parseInt(cubePick.replace(cubeColor, ''))
    cubesFromRound = {
      ...cubesFromRound,
      [cubeColor]: isNaN(cubeNumber) ? 0 : cubeNumber
    }
  })
  return cubesFromRound;
}

const getCubesFromGame = (game) => {
  let cubesFromGame = { "red": 0, "green": 0, "blue": 0 };
  const rounds = getRoundsFromGame(game);
  rounds.forEach((round) => {
    const cubesFromRound = getCubesFromRound(round);
    cubeColors.forEach((color) => {
      if (cubesFromRound[color] > cubesFromGame[color]) {
        cubesFromGame = {
          ...cubesFromGame,
          [color]: cubesFromRound[color]
        }
      }
    })
  })
  return cubesFromGame;
}

const getPossibleGamesIdsFromCubes = (games, cubes) => {
  return games.reduce((acc, game) => {
    const gameId = parseInt(game.match(/ \d*/))
    const cubesFromGame = getCubesFromGame(game);
    if (cubes["red"] >= cubesFromGame["red"]
      && cubes["green"] >= cubesFromGame["green"]
      && cubes["blue"] >= cubesFromGame["blue"]) {
      return acc + gameId;
    }
    return acc;
  }, 0)
}

const getPowerOfGameSetsFromCubes = (games) => {
  return games.reduce((acc, game) => {
    const cubesFromGame = getCubesFromGame(game);
    const powerOfGameSet = cubesFromGame["red"] * cubesFromGame["green"] * cubesFromGame["blue"];
    console.log("powerOfGameSet : ", powerOfGameSet)
    return acc + powerOfGameSet;
  }, 0)
}

getCubesFromGame(input[0]);
const res = getPossibleGamesIdsFromCubes(input, { "red": 12, "green": 13, "blue": 14 });
fs.writeFileSync('./Day 2/output.txt', res.toString(), 'utf8');

const res2 = getPowerOfGameSetsFromCubes(input, { "red": 12, "green": 13, "blue": 14 });
fs.writeFileSync('./Day 2/output2.txt', res2.toString(), 'utf8');

module.exports = { getCubesFromGame };

