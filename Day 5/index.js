const fs = require('fs');
const { get } = require('http');
const input = fs.readFileSync('./Day 5/input.txt', 'utf8').split('\n');
input.pop();

const getInputSeeds = (input) => {
  return input.replace(/^.*: /, '').split(' ');
}

const getFormattedInput = (input) => {
  return input.reduce((acc, row) => {
    if (row === "") {
      acc.push([]);
    } else if (acc.length) {
      acc[acc.length - 1].push(row);
    }
    return acc;
  }, [[]]);
}

const getMap = (input, mapString) => {
  const subInput = input.find((subInput) => {
    return subInput[0] === mapString
  })
  subInput.shift();
  return subInput
}

const getRangeAndOffset = (inputMap) => {
  const rangesAndOffset = [];
  inputMap.map((row) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = row.split(' ');
    const sourceRangeEnd = parseInt(sourceRangeStart) + parseInt(rangeLength) - 1;
    const destinationRangeEnd = parseInt(destinationRangeStart) + parseInt(rangeLength) - 1;
    const offset = parseInt(destinationRangeStart) - parseInt(sourceRangeStart);
    rangesAndOffset.push([
      [parseInt(sourceRangeStart), sourceRangeEnd],
      offset
    ]);
  })
  return rangesAndOffset;
}

const formattedInput = getFormattedInput(input);

const inputSeed = getInputSeeds(formattedInput[0][0]);
const seedToSoilMap = getMap(formattedInput, "seed-to-soil map:");
const soilToFertilizerMap = getMap(formattedInput, "soil-to-fertilizer map:");
const fertilizerToWaterMap = getMap(formattedInput, "fertilizer-to-water map:");
const waterToLightMap = getMap(formattedInput, "water-to-light map:");
const lightToTemperatureMap = getMap(formattedInput, "light-to-temperature map:");
const temperatureToHumidityMap = getMap(formattedInput, "temperature-to-humidity map:");
const humidityToLocationMap = getMap(formattedInput, "humidity-to-location map:");

const getDestinationFromSourceAndMap = (source, inputMap) => {
  const sourceInt = parseInt(source);
  const rangeAndOffset = getRangeAndOffset(inputMap);
  const index1 = rangeAndOffset.findIndex((rangeAndOffset) => {
    const [sourceRange] = rangeAndOffset;
    return sourceInt >= sourceRange[0] && sourceInt <= sourceRange[1];
  })
  if (index1 === -1) {
    return sourceInt;
  } else {
    return sourceInt + rangeAndOffset[index1][1];
  }
}

const getLocationForSeed = (seed) => {
  const soil = getDestinationFromSourceAndMap(seed, seedToSoilMap);
  const fertilizer = getDestinationFromSourceAndMap(soil, soilToFertilizerMap);
  const water = getDestinationFromSourceAndMap(fertilizer, fertilizerToWaterMap);
  const light = getDestinationFromSourceAndMap(water, waterToLightMap);
  const temperature = getDestinationFromSourceAndMap(light, lightToTemperatureMap);
  const humidity = getDestinationFromSourceAndMap(temperature, temperatureToHumidityMap);
  const location = getDestinationFromSourceAndMap(humidity, humidityToLocationMap);
  return location
}

// get the lowest location from seeds 
const res = inputSeed.reduce((acc, seed) => {
  const location = getLocationForSeed(seed);
  console.log('location', location);
  if (acc === null || location < acc) {
    acc = location;
  }
  return acc;
}, null)

fs.writeFileSync('./Day 5/output.txt', res.toString());
