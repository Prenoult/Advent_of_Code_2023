const fs = require('fs');
const input = fs.readFileSync('./Day 7/input.txt', { encoding: 'utf-8' }).split('\n');
input.pop();

const getHandAndBid = (input) => {
  return input.split(' ');
}

const inputProcessed = input.map((input) => getHandAndBid(input));

const getNbOfPair = (cards) => {
  const pairValue = cards.map(card => {
    return cards.filter((card2) => card2 === card).length === 2;
  });
  const filteredPairValue = pairValue.filter((card) => card !== false);
  if (filteredPairValue.length === 0) {
    return 0;
  }
  return filteredPairValue.length / 2
}

const getHandType = (hand) => {
  const cards = hand.split('');
  const FiveOfAKind = cards.every((card) => card === cards[0]);
  const FourOfAKind = cards.filter((card) => card === cards[0]).length === 4
    || cards.filter((card) => card === cards[1]).length === 4;

  const ThreeOfAKind = cards.filter((card) => card === cards[0]).length === 3
    || cards.filter((card) => card === cards[1]).length === 3
    || cards.filter((card) => card === cards[2]).length === 3
    || cards.filter((card) => card === cards[3]).length === 3
    || cards.filter((card) => card === cards[4]).length === 3;

  const nbOfPairs = getNbOfPair(cards);

  const TwoPairs = nbOfPairs === 2;
  const OnePair = nbOfPairs === 1;
  const FullHouse = ThreeOfAKind && OnePair;

  if (FiveOfAKind) return 6;
  if (FourOfAKind) return 5;
  if (FullHouse) return 4;
  if (ThreeOfAKind) return 3;
  if (TwoPairs) return 2;
  if (OnePair) return 1;
  return 0;
}

const getCardValue = (card) => {
  if (card === 'A') return 14;
  if (card === 'K') return 13;
  if (card === 'Q') return 12;
  if (card === 'J') return 11;
  if (card === 'T') return 10;
  return parseInt(card);
}

const getCardValuesFromHand = (hand) => {
  return hand.split('').map((card) => getCardValue(card));
}

const compareHands = (hand1, hand2) => {
  const handType1 = getHandType(hand1);
  const handType2 = getHandType(hand2);
  if (handType1 > handType2) return 1;
  if (handType1 < handType2) return -1;
  if (handType1 === handType2) {
    const cards1 = getCardValuesFromHand(hand1);
    const cards2 = getCardValuesFromHand(hand2);
    for (let i = 0; i < cards1.length; i++) {
      if (cards1[i] > cards2[i]) return 1;
      if (cards1[i] < cards2[i]) return -1;
    }
  }
  return 0;
}

const getOrderHands = (hands) => {
  return hands.sort((hand1, hand2) => compareHands(hand1[0], hand2[0]));
}

const getTotalWinnings = (hands) => {
  const orderHands = getOrderHands(hands);
  return orderHands.reduce((acc, hand, index) => {
    return acc + parseInt(hand[1]) * (index + 1);
  }, 0);
}

const res = getTotalWinnings(inputProcessed);
fs.writeFileSync('./Day 7/output.txt', res.toString());

// part2
const getHandType2 = (hand) => {
  const cards = hand.split('');
  const nbOfJoker = cards.filter((card) => card === 'J').length;
  const isJoker = nbOfJoker >= 1;
  const FiveOfAKind = cards.every((card) => card === cards[0]);
  const FourOfAKind = cards.filter((card) => card === cards[0]).length === 4
    || cards.filter((card) => card === cards[1]).length === 4;

  const ThreeOfAKind = cards.filter((card) => card === cards[0]).length === 3
    || cards.filter((card) => card === cards[1]).length === 3
    || cards.filter((card) => card === cards[2]).length === 3
    || cards.filter((card) => card === cards[3]).length === 3
    || cards.filter((card) => card === cards[4]).length === 3;

  const nbOfPairs = getNbOfPair(cards);

  const TwoPairs = nbOfPairs === 2;
  const OnePair = nbOfPairs === 1;
  const FullHouse = ThreeOfAKind && OnePair;

  if (FiveOfAKind) return 6;
  if (FourOfAKind) return 5 + (isJoker ? 1 : 0);
  if (FullHouse) return 4 + (isJoker ? 2 : 0);
  if (ThreeOfAKind) return 3 + (isJoker ? 2 : 0);
  if (TwoPairs) return 2 + (nbOfJoker > 1 ? 3 : isJoker ? 2 : 0);
  if (OnePair) return 1 + (isJoker ? 2 : 0);
  return 0 + (isJoker ? 1 : 0);
}

const getCardValue2 = (card) => {
  if (card === 'A') return 13;
  if (card === 'K') return 12;
  if (card === 'Q') return 11;
  if (card === 'J') return 1;
  if (card === 'T') return 10;
  return parseInt(card);
}

const getCardValuesFromHand2 = (hand) => {
  return hand.split('').map((card) => getCardValue2(card));
}

const compareHands2 = (hand1, hand2) => {
  const handType1 = getHandType2(hand1);
  const handType2 = getHandType2(hand2);
  if (handType1 > handType2) return 1;
  if (handType1 < handType2) return -1;
  if (handType1 === handType2) {
    const cards1 = getCardValuesFromHand2(hand1);
    const cards2 = getCardValuesFromHand2(hand2);
    for (let i = 0; i < cards1.length; i++) {
      if (cards1[i] > cards2[i]) return 1;
      if (cards1[i] < cards2[i]) return -1;
    }
  }
  return 0;
}

const getOrderHands2 = (hands) => {
  return hands.sort((hand1, hand2) => compareHands2(hand1[0], hand2[0]));
}

const getTotalWinnings2 = (hands) => {
  const orderHands = getOrderHands2(hands);
  return orderHands.reduce((acc, hand, index) => {
    return acc + parseInt(hand[1]) * (index + 1);
  }, 0);
}

const res2 = getTotalWinnings2(inputProcessed);
fs.writeFileSync('./Day 7/output2.txt', res2.toString());

module.exports = {
  getHandAndBid,
  getHandType,
  compareHands,
  compareHands2,
  getTotalWinnings,
  getTotalWinnings2
}