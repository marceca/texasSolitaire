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



// Getting the User results
function getUserResults(userHand) {
  // User results variables
  let userResult = {
    score: 0,
    highCard: 0,
    highPairOfWinningHand: 0,
    wholeHand: [],
    bestFiveCards: []
  };
  let userCardCount = {};
  let userStraightCount = [];
  let userFlush = {};
  let straightCounter = 0;
  let possibleStraightFlush = '';
  let flushCountIfPossible = 0;
  let checkStraightFlush = [];
  let checkStraightFlushCount = 0;
  // Get user best hand
  for(let i = 0; i < userHand.length; i++) {
    // Add each card to whole hand result
    userResult.wholeHand.push(userHand[i][0].value);

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
    if(userHand[i][0].value > userResult.highCard) {
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
      userResult['highPairOfWinningHand'] = Number(key);
    }
    if(userCardCount[key] === 3) {
      pairCount['three'] += 1
      userResult['highPairOfWinningHand'] = Number(key);
    }
    if(userCardCount[key] === 4) {
      pairCount['four'] += 1
      userResult['highPairOfWinningHand'] = Number(key);
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
        userResult['highPairOfWinningHand'] = Number(userStraightCount[i])
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
  let computerBestHand = {
    score: 0,
    highCard: 0,
    highPairOfWinningHand: 0,
    computerHand: 0
  };
  for(let i = 0; i < computerResults.handObjects.length; i++) {
    // Computer variables inside loops to reset each time
    let curCompHand;
    let curCompResults = {
      score: 0,
      highCard: 0,
      highPairOfWinningHand: 0,
      wholeHand: []
    };
    let compCardCount = {}
    let compFlush = {};
    let flushCountIfPossible = 0;
    let compStraightCount = [];
    let compCounter = 0;
    let possibleStraightFlush = '';
    let checkStraightFlush = [];
    let checkStraightFlushCount = 0

    // Skip users hand
    if(computerResults.chosenHand - 1 === i) {
      continue
    }

    curCompHand = computerResults.handObjects[i];
    curCompResults.wholeHand.push(computerResults.handObjects[i][0][0].value)
    curCompResults.wholeHand.push(computerResults.handObjects[i][1][0].value)
    for(let i = 0; i < computerResults.communityCardsValue.length; i++) {
      curCompHand.push(computerResults.communityCardsValue[i])
      curCompResults.wholeHand.push(computerResults.communityCardsValue[i][0].value)
    }
    // Get computer best hand of current iteration
    for(let i = 0; i < curCompHand.length; i++) {
      // Get card counts
      if(compCardCount[curCompHand[i][0].value]) {
        compCardCount[curCompHand[i][0].value] += 1;
      } else {
        compCardCount[curCompHand[i][0].value] = 1;
      }
      // Get suit counts
      if(compFlush[curCompHand[i][0].suit]) {
        compFlush[curCompHand[i][0].suit] += 1;
        if(compFlush[curCompHand[i][0].suit] > flushCountIfPossible) {
          possibleStraightFlush = curCompHand[i][0].suit;
        }
      } else {
        compFlush[curCompHand[i][0].suit] = 1;
      }
      // Set high card to score
      if(curCompHand[i][0].value > curCompResults.highCard) {
        curCompResults.highCard = curCompHand[i][0].value;
      }
      // Getting all card values to check for straight
      compStraightCount.push(curCompHand[i][0].value)
    }

    // Get pair amounts
    let pairCount = {
      'pair': 0,
      'three': 0,
      'four': 0
    }

    // Setting pair, three of a kind, four of a kind and what the card value is of the best
    for(let key in compCardCount) {
      if(compCardCount[key] === 2) {
        pairCount['pair'] += 1;
        curCompResults['highPairOfWinningHand'] = Number(key);
      }
      if(compCardCount[key] === 3) {
        pairCount['three'] += 1
        curCompResults['highPairOfWinningHand'] = Number(key);
      }
      if(compCardCount[key] === 4) {
        pairCount['four'] += 1
        curCompResults['highPairOfWinningHand'] = Number(key);
      }
    }

    // Set high card
    curCompResults.score = curCompResults.highCard

    // One pair
    if(pairCount['pair'] === 1) {
      curCompResults['score'] = winningHandsKey['A Pair'];
    }
    // Two pair
    if(pairCount['pair'] >= 2) {
      curCompResults['score'] = winningHandsKey['Two Pair'];
    }
    // Three of a kind
    if(pairCount['three'] === 1) {
      curCompResults['score'] = winningHandsKey['Three of a Kind'];
    }

    // Straight
    compStraightCount.sort((a,b) => {
      return a - b;
    })
    for(let i = 0; i < compStraightCount.length; i++) {
      if(compStraightCount[i] + 1 === compStraightCount[i + 1]) {
        compCounter++;
        if(compCounter >= 4) {
          curCompResults['score'] = winningHandsKey['Straight'];
          curCompResults['highPairOfWinningHand'] = Number(compStraightCount[i])
        }
      } else if(compStraightCount[i] === compStraightCount[i - 1]) {
        continue;
      } else {
        compCounter = 0;
      }
    }

    // Flush
    for(let key in compFlush) {
      if(compFlush[key] >= 5) {
        curCompResults['score'] = winningHandsKey['Flush'];   
        possibleStraightFlush = key;       
      }
    }

    // Fullhouse
    if(pairCount['pair'] === 1 && pairCount['three'] === 1) {
      curCompResults['score'] = winningHandsKey['Fullhouse'];
    }

    // Four of a kind
    if(pairCount['four'] === 1) {
      curCompResults['score'] = winningHandsKey['Four of a Kind'];
    }
    
    // Get values for straight flush check
    for(let i = 0; i < curCompHand.length; i++) {
      if(curCompHand[i][0].suit === possibleStraightFlush) {
        checkStraightFlush.push(curCompHand[i][0].value)
      }
    }
    // Straight flush
    for(let i = 0; i < checkStraightFlush.length; i++) {
      if(checkStraightFlush[i + 1]) {
        if(checkStraightFlush[i] + 1 === checkStraightFlush[i + 1]) {
          checkStraightFlushCount += 1;
          if(checkStraightFlushCount >= 4) {
          curCompResults['score'] = winningHandsKey['Straight Flush'];
          }
        }
      }
    }
    
    // Set best hand for computer if score is greater the current best score
    if(curCompResults.score > computerBestHand.score) {
      computerBestHand.score = curCompResults.score;
      computerBestHand.highCard = curCompResults.highCard;
      computerBestHand.highPairOfWinningHand = curCompResults.highPairOfWinningHand;
      computerBestHand.wholeHand = curCompResults.wholeHand;
      computerBestHand.computerHand = i + 1;
      // Check if the score is the same
    } else if(curCompResults.score === computerBestHand.score) {
      // If the score is the same and its a pair, two pair, three of a kind, full house or four of a kind do check for highest pair
      if(curCompResults.score === 1000 || curCompResults.score === 2000 || curCompResults.score === 3000 || curCompResults.score === 6000 || curCompResults.score === 7000) {
        // Check highest pair
        if(curCompResults.highPairOfWinningHand > computerBestHand.highPairOfWinningHand) {
          computerBestHand.score = curCompResults.score;
          computerBestHand.highCard = curCompResults.highCard;
          computerBestHand.highPairOfWinningHand = curCompResults.highPairOfWinningHand;
          computerBestHand.wholeHand = curCompResults.wholeHand;
          computerBestHand.computerHand = i + 1;
        }
        // This was supposed to check for highest card is flush / straight but needs to be revised as it doesn't work
        // This checks highest card out of all 7 cards and not the specific 5 card hand
      } else if(curCompResults.highCard > computerBestHand.highCard) {
          computerBestHand.score = curCompResults.score;
          computerBestHand.highCard = curCompResults.highCard;
          computerBestHand.highPairOfWinningHand = curCompResults.highPairOfWinningHand;
          computerBestHand.wholeHand = curCompResults.wholeHand;
          computerBestHand.computerHand = i + 1;
        }
      }
  }
  // Return best hand of computer
  return computerBestHand;
}

module.exports = {
  getUserResults,
  getComputerResults
}