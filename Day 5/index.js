const fs = require('fs');
const { get } = require('http');
const input = fs.readFileSync('./Day 5/input.txt', 'utf8').split('\n');
input.pop();
const input_test = fs.readFileSync('./Day 5/input_test.txt', 'utf8').split('\n');

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

const getRangesAndOffsets = (inputMap) => {
  const rangesAndOffsets = [];
  inputMap.map((row) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = row.split(' ');
    const sourceRangeEnd = parseInt(sourceRangeStart) + parseInt(rangeLength) - 1;
    const offset = parseInt(destinationRangeStart) - parseInt(sourceRangeStart);
    rangesAndOffsets.push([
      [parseInt(sourceRangeStart), sourceRangeEnd],
      offset
    ]);
  })
  return rangesAndOffsets;
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
  const rangeAndOffset = getRangesAndOffsets(inputMap);
  const index = rangeAndOffset.findIndex((rangeAndOffset) => {
    const [sourceRange] = rangeAndOffset;
    return sourceInt >= sourceRange[0] && sourceInt <= sourceRange[1];
  })
  if (index === -1) {
    return sourceInt;
  } else {
    return sourceInt + rangeAndOffset[index][1];
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
  if (acc === null || location < acc) {
    acc = location;
  }
  return acc;
}, null)

fs.writeFileSync('./Day 5/output.txt', res.toString());

const getSeedsRanges = (inputSeed) => {
  const arr = Array.from(
    { length: inputSeed.length / 2 },
    (_, i) => [inputSeed[i * 2], inputSeed[i * 2 + 1]]
  );
  return arr.map((element) => {
    return [parseInt(element[0]), parseInt(element[0]) + parseInt(element[1]) - 1];
  });
}

const isRangeAInB = (rangeA, rangeB) => {
  return rangeA[0] >= rangeB[0] && rangeA[1] <= rangeB[1];
}

const isLowerBoundaryAInBAndNotUpper = (rangeA, rangeB) => {
  return rangeA[0] >= rangeB[0] && rangeA[0] <= rangeB[1] && rangeA[1] > rangeB[1];
}

const isUpperBoundaryAInBAndNotLower = (rangeA, rangeB) => {
  return rangeA[0] < rangeB[0] && rangeA[1] >= rangeB[0] && rangeA[1] <= rangeB[1];
}

const getDestinationRangeFromSourceRangeAndMap = (sourceRanges, inputMap) => {
  const rangesAndOffsets = getRangesAndOffsets(inputMap);
  const destinationRangeFromSourceRangeAndMap = [];
  console.log("rangesAndOffsets : ", rangesAndOffsets)
  sourceRanges.forEach((sourceRange) => {
    console.log("sourceRange : ", sourceRange)
    const index1 = rangesAndOffsets.findIndex((rangeAndOffset) => {
      const [currentSourceRange] = rangeAndOffset;
      return isRangeAInB(sourceRange, currentSourceRange);
    })
    const index2 = rangesAndOffsets.findIndex((rangeAndOffset) => {
      const [currentSourceRange] = rangeAndOffset;
      return isLowerBoundaryAInBAndNotUpper(sourceRange, currentSourceRange);
    })
    const index3 = rangesAndOffsets.findIndex((rangeAndOffset) => {
      const [currentSourceRange] = rangeAndOffset;
      return isUpperBoundaryAInBAndNotLower(sourceRange, currentSourceRange);
    })
    console.log('indexes : ', index1, index2, index3)
    if (index1 === -1 && index2 === -1 && index3 === -1) {
      destinationRangeFromSourceRangeAndMap.push(sourceRange);
      console.log("toPush : ", sourceRange)
    } else {
      if (index1 !== -1) {
        const [_, offset] = rangesAndOffsets[index1];
        destinationRangeFromSourceRangeAndMap.push([sourceRange[0] + offset, sourceRange[1] + offset]);
        console.log("toPush : ", [sourceRange[0] + offset, sourceRange[1] + offset])
      }
      if (index2 !== -1) {
        const [currentSourceRange, offset] = rangesAndOffsets[index2];
        destinationRangeFromSourceRangeAndMap.push(
          [sourceRange[0] + offset, currentSourceRange[1] + offset],
          [currentSourceRange[1] + 1, sourceRange[1]]
        );
        console.log("toPush : ",
          [sourceRange[0] + offset, currentSourceRange[1] + offset],
          [currentSourceRange[1] + 1, sourceRange[1]]
        )
      }
      if (index3 !== -1) {
        const [currentSourceRange, offset] = rangesAndOffsets[index3];
        destinationRangeFromSourceRangeAndMap.push(
          [sourceRange[0], currentSourceRange[0] - 1],
          [currentSourceRange[0] + offset, sourceRange[1] + offset]
        );
        console.log("toPush : ",
          [sourceRange[0], currentSourceRange[0] - 1],
          [currentSourceRange[0] + offset, sourceRange[1] + offset]
        )
      }
    }
    console.log('---next source---')
  })
  console.log("destinationRangeFromSourceRangeAndMap : ", destinationRangeFromSourceRangeAndMap)
  console.log('---next map---')
  return destinationRangeFromSourceRangeAndMap;
}


// tests
const formattedInputTest = getFormattedInput(input_test);
const inputSeedTest = getInputSeeds(formattedInputTest[0][0]);
// console.log("inputSeedTest : ", inputSeedTest)

const seedToSoilMapTest = getMap(formattedInputTest, "seed-to-soil map:");
const soilToFertilizerMapTest = getMap(formattedInputTest, "soil-to-fertilizer map:");
const fertilizerToWaterMapTest = getMap(formattedInputTest, "fertilizer-to-water map:");
const waterToLightMapTest = getMap(formattedInputTest, "water-to-light map:");
const lightToTemperatureMapTest = getMap(formattedInputTest, "light-to-temperature map:");
const temperatureToHumidityMapTest = getMap(formattedInputTest, "temperature-to-humidity map:");
const humidityToLocationMapTest = getMap(formattedInputTest, "humidity-to-location map:");

const seedsRangesTest = getSeedsRanges(inputSeedTest);
const seedsRanges = getSeedsRanges(inputSeed);

const getLocationRangeForSeedRangeTest = (seedRange) => {
  const soilRange = getDestinationRangeFromSourceRangeAndMap(seedRange, seedToSoilMapTest);
  const fertilizerRange = getDestinationRangeFromSourceRangeAndMap(soilRange, soilToFertilizerMapTest);
  const waterRange = getDestinationRangeFromSourceRangeAndMap(fertilizerRange, fertilizerToWaterMapTest);
  const lightRange = getDestinationRangeFromSourceRangeAndMap(waterRange, waterToLightMapTest);
  const temperatureRange = getDestinationRangeFromSourceRangeAndMap(lightRange, lightToTemperatureMapTest);
  const humidityRange = getDestinationRangeFromSourceRangeAndMap(temperatureRange, temperatureToHumidityMapTest);
  const locationRange = getDestinationRangeFromSourceRangeAndMap(humidityRange, humidityToLocationMapTest);
  return locationRange;
}

const getLocationRangeForSeedRange = (seedRange) => {
  const soilRange = getDestinationRangeFromSourceRangeAndMap(seedRange, seedToSoilMap);
  const fertilizerRange = getDestinationRangeFromSourceRangeAndMap(soilRange, soilToFertilizerMap);
  const waterRange = getDestinationRangeFromSourceRangeAndMap(fertilizerRange, fertilizerToWaterMap);
  const lightRange = getDestinationRangeFromSourceRangeAndMap(waterRange, waterToLightMap);
  const temperatureRange = getDestinationRangeFromSourceRangeAndMap(lightRange, lightToTemperatureMap);
  const humidityRange = getDestinationRangeFromSourceRangeAndMap(temperatureRange, temperatureToHumidityMap);
  const locationRange = getDestinationRangeFromSourceRangeAndMap(humidityRange, humidityToLocationMap);
  return locationRange;
}


// const preRes = getLocationRangeForSeedRange(seedsRanges)
const preRes_test = getLocationRangeForSeedRangeTest(seedsRangesTest)

const res2_test = preRes_test.reduce((acc, cell) => {
  const lowestFromCell = Math.min(...cell);
  if (lowestFromCell < acc) {
    return lowestFromCell;
  }
  return acc;
}, Infinity)

// const res2 = preRes.reduce((acc, cell) => {
//   const lowestFromCell = Math.min(...cell)
//   if (lowestFromCell < acc) {
//     return lowestFromCell;
//   }
//   return acc;
// }, Infinity)


console.log("res2_test : ", res2_test)
// console.log("res2 : ", res2)



