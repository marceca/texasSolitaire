// Key for winning hands
const winningHandsKey = {
  'Straight Flush': 8000,
  'Four of a Kind': 7000,
  'Fullhouse': 6000,
  'Flush': 5000,
  'Straight': 4000,
  'Three of a Kind': 3000,
  'Two Pair': 2000,
  'A Pair': 1000
}

// User results variables
let userResult = {
  score: 0,
  highCard: 0,
  highCardOfWinningHand: 0
};
let userCardCount = {};
let userStraightCount = [];
let userFlush = {};
let straightCounter = 0;
let straightFlushCount = 0;
let possibleStraightFlush = '';

let flushCountIfPossible = 0;
let checkStraightFlush = [];
let checkStraightFlushCount = 0;

// Getting the User results
function getUserResults(userHand) {
  // Get user best hand
  for(let i = 0; i < userHand.length; i++) {
    // Get card counts
    if(userCardCount[userHand[i][0].value]) {
      userCardCount[userHand[i][0].value] += 1;
    } else {
      userCardCount[userHand[i][0].value] = 1;
    }
    // Get suit counts
    if(userFlush[userHand[i][0].suit]) {
      userFlush[userHand[i][0].suit] += 1;
      if(userFlush[userHand[i][0].suit] > flushCountIfPossible) {
        possibleStraightFlush = userHand[i][0].suit;
      }
    } else {
      userFlush[userHand[i][0].suit] = 1;
    }
    // Set high card to score
    if(userHand[i][0].value > userResult.score) {
      userResult.highCard = userHand[i][0].value;
    }
    // Getting all card values to check for straight
    userStraightCount.push(userHand[i][0].value)
  }
  // Get pair amounts
  let pairCount = {
    'pair': 0,
    'three': 0,
    'four': 0
  }

  // Setting pair, three of a kind, four of a kind and what the card value is of the best
  for(let key in userCardCount) {
    if(userCardCount[key] === 2) {
      pairCount['pair'] += 1;
      userResult['highCardOfWinningHand'] = key;
    }
    if(userCardCount[key] === 3) {
      pairCount['three'] += 1
      userResult['highCardOfWinningHand'] = key;
    }
    if(userCardCount[key] === 4) {
      pairCount['four'] += 1
      userResult['highCardOfWinningHand'] = key;
    }
  }

  // Set high card
  userResult.score = userResult.highCard

  // One pair
  if(pairCount['pair'] === 1) {
    userResult['score'] = winningHandsKey['A Pair'];
  }
  // Two pair
  if(pairCount['pair'] >= 2) {
    userResult['score'] = winningHandsKey['Two Pair'];
  }
  // Three of a kind
  if(pairCount['three'] === 1) {
    userResult['score'] = winningHandsKey['Three of a Kind'];
  }
  // Straight
  userStraightCount.sort((a,b) => {
    return a - b;
  })
  for(let i = 0; i < userStraightCount.length; i++) {
    if(userStraightCount[i] + 1 === userStraightCount[i + 1]) {
      straightCounter++;
      if(straightCounter >= 4) {
        userResult['score'] = winningHandsKey['Straight'];
        userResult['highCardOfWinningHand'] = userStraightCount[i]
      }
    } else if(userStraightCount[i] === userStraightCount[i - 1]) {
      continue;
    } else {
      straightCounter = 0;
    }
  }
  // Flush
  for(let key in userFlush) {
    if(userFlush[key] >= 5) {
      userResult['score'] = winningHandsKey['Flush'];   
      possibleStraightFlush = key;       
    }
  }
  // Fullhouse
  if(pairCount['pair'] === 1 && pairCount['three'] === 1) {
    userResult['score'] = winningHandsKey['Fullhouse'];
  }
  // Four of a kind
  if(pairCount['four'] === 1) {
    userResult['score'] = winningHandsKey['Four of a Kind'];
  }
  
  // Get values for straight flush check
  for(let i = 0; i < userHand.length; i++) {
    if(userHand[i][0].suit === possibleStraightFlush) {
      checkStraightFlush.push(userHand[i][0].value)
    }
  }
  // Straight flush
  for(let i = 0; i < checkStraightFlush.length; i++) {
    if(checkStraightFlush[i + 1]) {
      if(checkStraightFlush[i] + 1 === checkStraightFlush[i + 1]) {
        checkStraightFlushCount += 1;
        if(checkStraightFlushCount >= 4) {
        userResult['score'] = winningHandsKey['Straight Flush'];
        }
      }
    }
  }
  return userResult
}

function getComputerResults(computerResults) {

  for(let i = 0; i < computerResults.handObjects.length; i++) {
    if(computerResults.chosenHand - 1 === i) {
      continue
    }
    console.log(computerResults.handObjects[i])
  }

  return computerResults
}

module.exports = {
  getUserResults,
  getComputerResults
}