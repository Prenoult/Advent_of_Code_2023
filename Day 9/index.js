const fs = require('fs');
const { get } = require('http');
const input = fs.readFileSync('./Day 9/input.txt', 'utf-8').split('\n');
input.pop();

const sequences = input.map(row => row.split(' '));
const firstSequence = sequences[0];

const getNextSequence = (sequence) => {
  const nextSequence = [];
  sequence.forEach((number, index) => {
    if (index === sequence.length - 1) {
      return;
    }
    const currentNumber = parseInt(number);
    const nextNumber = parseInt(sequence[index + 1]);
    const difference = nextNumber - currentNumber;
    nextSequence.push(difference);
  });
  return nextSequence;
}

const calculateNextTerm = (sequence, isBackward) => {
  let nextSeq = getNextSequence(sequence);
  const res = [sequence]
  while (!nextSeq.every(number => number === 0)) {
    res.push(nextSeq);
    nextSeq = getNextSequence(nextSeq);
  }
  res.push(nextSeq)
  res.reverse();
  if (isBackward) {
    return res.reduce((acc, curr) => parseInt(curr[0]) - parseInt(acc), 0)
  }
  return res.reduce((acc, curr) => parseInt(acc) + parseInt(curr[curr.length - 1]), 0)
}

const input_test = fs.readFileSync('./Day 9/input_test.txt', 'utf-8').split('\n');
const sequences_test = input_test.map(row => row.split(' '));
const res_test = sequences_test.reduce(
  (acc, sequence) => parseInt(acc) + calculateNextTerm(sequence),
  0
);

const res = sequences.reduce((acc, sequence) => parseInt(acc) + calculateNextTerm(sequence), 0);
fs.writeFileSync('./Day 9/output.txt', res.toString());

const res2 = sequences.reduce(
  (acc, sequence) => parseInt(acc) + calculateNextTerm(sequence, true),
  0
);
fs.writeFileSync('./Day 9/output2.txt', res2.toString());
