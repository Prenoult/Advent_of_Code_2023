const fs = require('fs');
const { get } = require('http');
const input = fs.readFileSync('./Day 8/input.txt', { encoding: 'utf-8' }).split('\n');
input.pop();

const getInstruction = (input) => {
  return input[0].split('');
}

const getNodes = (input) => {
  const newInput = input.slice(2);
  return newInput.map((node) => {
    const newNode = node.split(' = ');
    const value = newNode[0]
    const leftRight = newNode[1].replace("(", "").replace(")", "").split(", ")
    return [value, leftRight]
  })
}

const instructions = getInstruction(input);
const nodes = getNodes(input);

const getNextNode = (node, instruction) => {
  const isNextLeft = instruction === 'L';
  return isNextLeft ? node[1][0] : node[1][1];
}

const getNbOfSteps = (instructions, nodes) => {
  const startingNode = nodes.find((node) => node[0] === 'AAA');
  let currentNode = startingNode;
  let index = 0;
  let nbOfSteps = 0;
  while (currentNode[0] !== 'ZZZ') {
    console.log(currentNode[0])
    const nextNode = getNextNode(currentNode, instructions[index]);
    currentNode = nodes.find((node) => node[0] === nextNode);
    nbOfSteps++;
    index = (index + 1) % instructions.length;
  }
  return nbOfSteps;
}

// tests
const input_test = fs.readFileSync('./Day 8/input_test.txt', { encoding: 'utf-8' }).split('\n');
const instructions_test = getInstruction(input_test);
const nodes_test = getNodes(input_test);
const input_test2 = fs.readFileSync('./Day 8/input_test2.txt', { encoding: 'utf-8' }).split('\n');
const instructions_test2 = getInstruction(input_test2);
const nodes_test2 = getNodes(input_test2);

const res = getNbOfSteps(instructions, nodes);
fs.writeFileSync('./Day 8/output.txt', res.toString());
