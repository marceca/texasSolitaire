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
    highPairs: [],
    highThreeOfAKind: [],
    highFourOfAKind: [],
    wholeHand: [],
    bestFiveCards: []
  };

  let userCardCount = {};
  let userStraightCount = [];
  let userFlush = {};
  let straightCounter = 0;
  let straightHighHand = [];
  let addFirst = true;
  let straightMade = false;
  let possibleStraightFlush = '';
  let flushCountIfPossible = 0;
  let checkStraightFlush = [];
  let checkStraightFlushCount = 0;
  // Setting variable for pairs, three of a kind and four of a kind to use later for best hand value
  let captureFirstPair;
  let captureSecondPair;
  let captureThreeOfAKind;
  let captureFourOfAKindValue;

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
      if(pairCount['pair'] === 1) {
        captureFirstPair = Number(key);
      }
      if(pairCount['pair'] === 2) {
        captureSecondPair = Number(key)
      }
      if(pairCount['pair'] === 3) {
        captureFirstPair = captureSecondPair;
      }
      if(pairCount['pair'] === 2 || pairCount['pair'] === 3) {
        userResult.bestFiveCards = [];
      }
      userResult.highPairs.push(Number(key));
      for(let i = 0; i < userResult.wholeHand.length; i++) {
        userResult.bestFiveCards.push(userResult.wholeHand[i]);
      }
      for(let i = 0; i < userResult.bestFiveCards.length; i++) {
        if(userResult.bestFiveCards[i] === Number(key) || userResult.bestFiveCards[i] === captureFirstPair) {
          continue;
        } else if(userResult.bestFiveCards.length < 6) {
          continue;
        } else {
          userResult.bestFiveCards.splice(i, 1);
          i--;
        }
      }
    }
    if(userCardCount[key] === 3) {
      pairCount['three'] += 1
      userResult.highThreeOfAKind.push(Number(key));
      captureThreeOfAKind = Number(key)
      for(let i = 0; i < userResult.wholeHand.length; i++) {
        userResult.bestFiveCards.push(userResult.wholeHand[i])
      }
      for(let i = 0; i < userResult.bestFiveCards.length; i++) {
        if(userResult.bestFiveCards[i] === Number(key)) {
          continue;
        } else if(userResult.bestFiveCards.length < 6) {
          continue;
        } else {
          userResult.bestFiveCards.splice(i, 1);
          i--;
        }
      }
    }
    if(userCardCount[key] === 4) {
      pairCount['four'] += 1;
      captureFourOfAKindValue = Number(key);
      userResult.highFourOfAKind.push(Number(key))
    }
  }

  // Set high card
  userResult.score = userResult.highCard

  // One pair
  if(pairCount['pair'] === 1) {
    userResult.score = winningHandsKey['A Pair'];
  }
  // Two pair
  if(pairCount['pair'] >= 2) {
    userResult.score = winningHandsKey['Two Pair'];
  }
  // Three of a kind
  if(pairCount['three'] === 1) {
    userResult.score = winningHandsKey['Three of a Kind'];
  }
  // Straight
  // Sort for check
  userStraightCount.sort((a,b) => {
    return b - a;
  })
  for(let i = 0; i < userStraightCount.length; i++) {
    if(userStraightCount[i] - 1 === userStraightCount[i + 1]) {
      straightCounter++;
      if(addFirst === true) {
        if(!straightMade) {
          straightHighHand.push(userStraightCount[i])
        }
        addFirst = false;
      }
      // Add to possible highhand
      if(userStraightCount[i] - 1 === userStraightCount[i + 1] && !straightMade) {
        straightHighHand.push(userStraightCount[i] - 1)
      }
      if(straightCounter >= 4) {
        userResult.score = winningHandsKey['Straight'];
        userResult.bestFiveCards = straightHighHand;
        straightMade = true;
        userResult.bestFiveCards.sort((a,b) => {
          return a - b;
        })
      }
    } else if(userStraightCount[i] === userStraightCount[i + 1]) {
      continue;
    } else {
      straightCounter = 0;
      // Reset highhand
      straightHighHand = [];
      addFirst = true;
    }
  }
  // Flush
  for(let key in userFlush) {
    if(userFlush[key] >= 5) {
      userResult['score'] = winningHandsKey['Flush'];   
      possibleStraightFlush = key;
      // Set all values of flush suit to best hand
      userResult.bestFiveCards = [];
      for(let i = 0; i < userHand.length; i++) {
        if(userHand[i][0].suit === possibleStraightFlush) {
          userResult.bestFiveCards.push(userHand[i][0].value)
        }
      }
      // Only grab top 5 values
      while(userResult.bestFiveCards.length > 5) {
        userResult.bestFiveCards.shift();
      }
    }
  }
  // Fullhouse
  if((pairCount['pair'] === 1 && pairCount['three'] === 1) || (pairCount['pair'] === 2 && pairCount['three'] === 1)) {
    userResult['score'] = winningHandsKey['Fullhouse'];
    userResult.bestFiveCards = [];
    for(let i = 0; i < userResult.wholeHand.length; i++) {
      userResult.bestFiveCards.push(userResult.wholeHand[i])
    }
    if(userResult.highPairs.length > 1) {
      for(let i = 0; i < userResult.bestFiveCards.length; i++) {
        if(userResult.bestFiveCards[i] === captureThreeOfAKind || userResult.bestFiveCards[i] === captureSecondPair) {
          continue;
        } else if(userResult.bestFiveCards.length < 6) {
          continue;
        } else {
          userResult.bestFiveCards.splice(i, 1);
          i--;
        }
      }
    } else {
      for(let i = 0; i < userResult.bestFiveCards.length; i++) {
        if(userResult.bestFiveCards[i] === captureThreeOfAKind || userResult.bestFiveCards[i] === captureFirstPair) {
          continue;
        } else if(userResult.bestFiveCards.length < 6) {
          continue;
        } else {
          userResult.bestFiveCards.splice(i, 1);
          i--;
        }
      }
    }
  }
  // Four of a kind
  if(pairCount['four'] === 1) {
    userResult['score'] = winningHandsKey['Four of a Kind'];
    userResult.bestFiveCards = [];
    for(let i = 0; i < userResult.wholeHand.length; i++) {
      userResult.bestFiveCards.push(userResult.wholeHand[i])
    }
    for(let i = 0; i < userResult.bestFiveCards.length; i++) {
      if(userResult.bestFiveCards[i] === captureFourOfAKindValue) {
        continue;
      } else if(userResult.bestFiveCards.length < 6) {
        continue;
      } else {
        userResult.bestFiveCards.splice(i, 1);
        i--;
      }
    }
  }
  
  // Get values for straight flush check
  for(let i = 0; i < userHand.length; i++) {
    if(userHand[i][0].suit === possibleStraightFlush) {
      checkStraightFlush.push(userHand[i][0].value)
    }
  }
  checkStraightFlush.sort((a,b) => {
    return a - b;
  })
  // Straight flush
  for(let i = 0; i < checkStraightFlush.length; i++) {
    if(checkStraightFlush[i + 1]) {
      if(checkStraightFlush[i] + 1 === checkStraightFlush[i + 1]) {
        checkStraightFlushCount += 1;
        if(checkStraightFlushCount >= 4) {
          userResult['score'] = winningHandsKey['Straight Flush'];
          userResult.bestFiveCards = [];
          for(let i = 0; i < checkStraightFlush.length; i++) {
            if(checkStraightFlush[i] + 1 === checkStraightFlush[i + 1] || checkStraightFlush[i] - 1 === checkStraightFlush[i - 1]) {
              userResult.bestFiveCards.push(checkStraightFlush[i])
            }
          }
          while(userResult.bestFiveCards.length > 5) {
            userResult.bestFiveCards.shift();
          }
        }
      } else {
        checkStraightFlush = 0;
      }
    }
  }
  return userResult
}

function getComputerResults(computerResults) {
  let allComputerHands = [];
  for(let i = 0; i < computerResults.handObjects.length - 1; i++) {
    let curCompHand;
    let curCompResults = {
      score: 0,
      highCard: 0,
      highPairs: [],
      highThreeOfAKind: [],
      highFourOfAKind: [],
      wholeHand: [],
      bestFiveCards: []
    };
    let compCardCount = {}
    let compFlush = {};
    let flushCountIfPossible = 0;
    let compStraightCount = [];
    let compStraightHighHand = [];
    let compAddFirst = true;
    let compCounter = 0;
    let possibleStraightFlush = '';
    let checkStraightFlush = [];
    let checkStraightFlushCount = 0;
    let straightMade = false;

    curCompHand = computerResults.handObjects[i];
    curCompResults.wholeHand.push(computerResults.handObjects[i][0][0].value)
    curCompResults.wholeHand.push(computerResults.handObjects[i][1][0].value)
    for(let i = 0; i < computerResults.communityCardsValue.length; i++) {
      curCompHand.push(computerResults.communityCardsValue[i])
      curCompResults.wholeHand.push(computerResults.communityCardsValue[i][0].value)
    }
    // Sort whole hand
    curCompResults.wholeHand.sort((a,b) => {
      return a - b;
    })
    
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

    // Set high hand with card value
    for(let i = 0; i < curCompResults.wholeHand.length; i++) {
      curCompResults.bestFiveCards.push(curCompResults.wholeHand[i]);
    }
    while(curCompResults.bestFiveCards.length > 5) {
      curCompResults.bestFiveCards.shift();
    }

    // Get pair amounts
    let pairCount = {
      'pair': 0,
      'three': 0,
      'four': 0
    }

    let captureCompFirstPair;
    let captureCompSecondPair;
    let captureCompThreeOfAKind;
    let captureCompFourOfAKindValue;

    // Setting pair, three of a kind, four of a kind and what the card value is of the best
    for(let key in compCardCount) {
      if(compCardCount[key] === 2) {
        curCompResults.bestFiveCards = [];
        pairCount['pair'] += 1;
        if(pairCount['pair'] === 1) {
          captureCompFirstPair = Number(key);
        }
        if(pairCount['pair'] === 2) {
          captureCompSecondPair = Number(key);
        }
        if(pairCount['pair'] === 3) {
          captureCompFirstPair = captureCompSecondPair;
        }
        if(pairCount['pair'] === 2 || pairCount['pair'] === 3) {
          curCompResults.bestFiveCards = [];
        }
        curCompResults.highPairs.push(Number(key));
        for(let i = 0; i < curCompHand.length; i++) {
          curCompResults.bestFiveCards.push(curCompHand[i][0].value);
        }
        curCompResults.bestFiveCards.sort((a,b) => {
          return a - b;
        })
        for(let i = 0; i < curCompResults.bestFiveCards.length; i++) {
          if(curCompResults.bestFiveCards[i] === Number(key) || curCompResults.bestFiveCards[i] === captureCompFirstPair) {
            continue;
          } else if(curCompResults.bestFiveCards.length < 6) {
            continue;
          } else {
            curCompResults.bestFiveCards.splice(i, 1);
            i--;
          }
        }
      }
      if(compCardCount[key] === 3) {
        pairCount['three'] += 1
        curCompResults.highThreeOfAKind.push(Number(key))
        captureCompThreeOfAKind = Number(key);
        curCompResults.bestFiveCards  = []
        for(let i = 0; i < curCompHand.length; i++) {
          curCompResults.bestFiveCards.push(curCompHand[i][0].value)
        }
        curCompResults.bestFiveCards.sort((a,b) => {
          return a - b;
        })
        for(let i = 0; i < curCompResults.bestFiveCards.length; i++) {
          if(curCompResults.bestFiveCards[i] === Number(key)) {
            continue;
          } else if(curCompResults.bestFiveCards.length < 6) {
            continue;
          } else {
            curCompResults.bestFiveCards.splice(i, 1);
            i--;
          }
        }
      }
      if(compCardCount[key] === 4) {
        pairCount['four'] += 1;
        captureFourOfAKindValue = Number(key);
        curCompResults.highFourOfAKind.push(Number(key))
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
      return b - a;
    })
    for(let i = 0; i < compStraightCount.length; i++) {
      if(compStraightCount[i] - 1 === compStraightCount[i + 1]) {
        compCounter++;
        if(compAddFirst === true) {
          if(!straightMade) {
            compStraightHighHand.push(compStraightCount[i])
          }
          compAddFirst = false;
        }
        if(compStraightCount[i] - 1 === compStraightCount[i + 1] && !straightMade) {
          compStraightHighHand.push(compStraightCount[i] - 1)          
        }
        if(compCounter >= 4) {
          curCompResults.score = winningHandsKey['Straight'];
          curCompResults.bestFiveCards = compStraightHighHand;
          straightMade = true;
          curCompResults.bestFiveCards.sort((a,b) => {
            return a - b;
          })
        }
      } else if(compStraightCount[i] === compStraightCount[i + 1]) {
        continue;
      } else {
        compCounter = 0;
        // Reset highhand
        compStraightHighHand = [];
        compAddFirst = true;
      }
    }

    // Flush
    for(let key in compFlush) {
      if(compFlush[key] >= 5) {
        curCompResults['score'] = winningHandsKey['Flush'];   
        possibleStraightFlush = key;   
        curCompResults.bestFiveCards = [];
        for(let j = 0; j < computerResults.handObjects[i].length; j++) {
          if(computerResults.handObjects[i][j][0].suit === possibleStraightFlush) {
            curCompResults.bestFiveCards.push(computerResults.handObjects[i][j][0].value)
          }
        }
        curCompResults.bestFiveCards.sort((a,b) => {
          return a - b;
        })
        while(curCompResults.bestFiveCards.length > 5) {
          curCompResults.bestFiveCards.shift()
        }
      }
    }
    // Fullhouse
    if((pairCount['pair'] === 1 && pairCount['three'] === 1) || (pairCount['pair'] === 2 && pairCount['three'] === 1)) {
      curCompResults['score'] = winningHandsKey['Fullhouse'];
      curCompResults.bestFiveCards = [];
      for(let i = 0; i < curCompResults.wholeHand.length; i++) {
        curCompResults.bestFiveCards.push(curCompResults.wholeHand[i])
      }
      if(curCompResults.highPairs.length > 1) {
        for(let i = 0; i < curCompResults.bestFiveCards.length; i++) {
          if(curCompResults.bestFiveCards[i] === captureCompThreeOfAKind || curCompResults.bestFiveCards[i] === captureCompSecondPair) {
            continue;
          } else if(curCompResults.bestFiveCards.length < 6) {
            continue;
          } else {
            curCompResults.bestFiveCards.splice(i, 1);
            i--;
          }
        }
      } else {
        for(let i = 0; i < curCompResults.bestFiveCards.length; i++) {
          if(curCompResults.bestFiveCards[i] === captureCompThreeOfAKind || curCompResults.bestFiveCards[i] === captureCompFirstPair) {
            continue;
          } else if(curCompResults.bestFiveCards.length < 6) {
            continue;
          } else {
            curCompResults.bestFiveCards.splice(i, 1);
            i--;
          }
        }
      }
    }

    // Four of a kind
    if(pairCount.four === 1) {
      curCompResults.score = winningHandsKey['Four of a Kind'];
      curCompResults.bestFiveCards = [];
      for(let i = 0; i < curCompResults.wholeHand.length; i++) {
        curCompResults.bestFiveCards.push(curCompResults.wholeHand[i])
      }
      // Setting best five card hand
      for(let i = 0; i < curCompResults.bestFiveCards.length; i++) {
        if(curCompResults.bestFiveCards[i] === captureFourOfAKindValue) {
          continue;
        } else if(curCompResults.bestFiveCards.length < 6) {
          continue;
        } else {
          curCompResults.bestFiveCards.splice(i, 1);
          i--;
        }
      }
      // Resetting high card value
      for(let i = 0; i < curCompResults.bestFiveCards.length; i++) {
        if(curCompResults.bestFiveCards[i] != captureFourOfAKindValue) {
          curCompResults.highCard = curCompResults.bestFiveCards[i];
        }
      }
    }
    
    // Get values for straight flush check
    for(let i = 0; i < curCompHand.length; i++) {
      if(curCompHand[i][0].suit === possibleStraightFlush) {
        checkStraightFlush.push(curCompHand[i][0].value)
      }
    }
    checkStraightFlush.sort((a,b) => {
      return a - b;
    })
    // Straight flush
    for(let i = 0; i < checkStraightFlush.length; i++) {
      if(checkStraightFlush[i + 1]) {
        if(checkStraightFlush[i] + 1 === checkStraightFlush[i + 1]) {
          checkStraightFlushCount += 1;
          if(checkStraightFlushCount >= 4) {
            curCompResults['score'] = winningHandsKey['Straight Flush'];
            curCompResults.bestFiveCards = [];
            for(let i = 0; i < checkStraightFlush.length; i++) {
              if(checkStraightFlush[i] + 1 === checkStraightFlush[i + 1] || checkStraightFlush[i] - 1 === checkStraightFlush[i - 1]) {
                curCompResults.bestFiveCards.push(checkStraightFlush[i])
              }
            }
            while(curCompResults.bestFiveCards.length > 5) {
              curCompResults.bestFiveCards.shift();
            }
          }
        } else {
          checkStraightFlushCount = 0;
        }
      }
    }
    allComputerHands.push(curCompResults);    
  }
  console.log('all comp hands ',allComputerHands)

  let bestComputerHands = [];
  // Set the starting best hand to the first of all hands.
  // Set the counter to exclude the first hand.
  bestComputerHands.push(allComputerHands[0])
  for(let i = 1; i < allComputerHands.length; i++) {
    // If current tested hand has a greater score change the best hand
    if(allComputerHands[i].score > bestComputerHands[0].score) {
      bestComputerHands = [];
      bestComputerHands.push(allComputerHands[i]);
      continue;
    }
    if(allComputerHands[i].score === bestComputerHands[0].score) {
      // High card check
      if(allComputerHands[i].score < 1000) {
        let isDraw = true;
        for(let j = 0; j < bestComputerHands[0].bestFiveCards.length; j++) {
          if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] > allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
            isDraw = false;
            break;
          } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] < allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
            bestComputerHands = [];
            bestComputerHands.push(allComputerHands[i]);
            isDraw = false;
            break;
          } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] === allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
            continue;
          }
        }
        if(isDraw === true) {
          bestComputerHands.push(allComputerHands[i]);
        }
      }
      // Check a Pair
      if(allComputerHands[i].score === 1000) {
        let isDraw = true;
        if(bestComputerHands[0].highPairs[0] > allComputerHands[i].highPairs[0]) {
          continue;
        } else if(bestComputerHands[0].highPairs[0] < allComputerHands[i].highPairs[0]) {
          bestComputerHands = [];
          bestComputerHands.push(allComputerHands[i]);
          isDraw = false;
        } else if(bestComputerHands[0].highPairs[0] === allComputerHands[i].highPairs[0]) {
          for(let j = 0; j < bestComputerHands[0].bestFiveCards.length; j++) {
            if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] > allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
              isDraw = false;
              break;
            } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] < allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
              bestComputerHands = [];
              bestComputerHands.push(allComputerHands[i]);
              isDraw = false;
              break;
            } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] === allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
              continue;
            }
          }
        }
        if(isDraw === true) {
          bestComputerHands.push(allComputerHands[i])
        }
      }
      // Check Two Pairs
      if(allComputerHands[i].score === 2000) {
        let isDraw = true;
        for(let j = 0; j < 2; j++) {
          if(bestComputerHands[0].highPairs[bestComputerHands[0].highPairs.length - j - 1] > allComputerHands[i].highPairs[allComputerHands[i].highPairs.length - j - 1]) {
            isDraw = false;
            break;
          } else if(bestComputerHands[0].highPairs[bestComputerHands[0].highPairs.length - j - 1] === allComputerHands[i].highPairs[allComputerHands[i].highPairs.length - j - 1]) {
            continue;
          } else if(bestComputerHands[0].highPairs[bestComputerHands[0].highPairs.length - j - 1] < allComputerHands[i].highPairs[allComputerHands[i].highPairs.length - j - 1]) {
            isDraw = false;
            bestComputerHands = [];
            bestComputerHands.push(allComputerHands[i]);
            break;
          }
        }
        if(isDraw === true) {
          if(bestComputerHands[0].highCard > allComputerHands[i].highCard) {
            continue;
          } else if(bestComputerHands[0].highCard < allComputerHands[i].highCard) {
            bestComputerHands = [];
            bestComputerHands.push(allComputerHands[i]);
          } else if(bestComputerHands[0].highCard === allComputerHands[i].highCard) {
            bestComputerHands.push(allComputerHands[i]);
          }
        }
      }
      // Check Three of a kind
      if(allComputerHands[i].score === 3000) {
        let isDraw = true;
        if(bestComputerHands[0].highThreeOfAKind[0] > allComputerHands[i].highThreeOfAKind[0]){
          continue;
        } else if(bestComputerHands[0].highThreeOfAKind[0] < allComputerHands[i].highThreeOfAKind[0]) {
          bestComputerHands = [];
          bestComputerHands.push(allComputerHands[i]);
        } else if (bestComputerHands[0].highThreeOfAKind[0] === allComputerHands[i].highThreeOfAKind[0]) {
          for(let j = 0; j < bestComputerHands[0].bestFiveCards.length; j++) {
            if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] > allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
              isDraw = false;
              break;
            } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] < allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
              bestComputerHands = [];
              bestComputerHands.push(allComputerHands[i]);
              isDraw = false;
              break;
            } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] === allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
              continue;
            }
          }
        }
        if(isDraw === true) {
          bestComputerHands.push(allComputerHands[i])
        }
      }
      // Check Straight
      if(allComputerHands[i].score === 4000) {
        if(bestComputerHands[0].bestFiveCards[4] > allComputerHands[i].bestFiveCards[4]) {
          continue;
        } else if(bestComputerHands[0].bestFiveCards[4] < allComputerHands[i].bestFiveCards[4]) {
          bestComputerHands = [];
          bestComputerHands.push(allComputerHands[i]);
        } else if(bestComputerHands[0].bestFiveCards[4] === allComputerHands[i].bestFiveCards[4]) {
          bestComputerHands.push(allComputerHands[i]);
        }
      }
      // Check Flush
      if(allComputerHands[i].score === 5000) {
        let isDraw = true;
        for(let j = 0; j < bestComputerHands[0].bestFiveCards.length; j++) {
          if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] > allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
            isDraw = false;
            break;
          } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] < allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
            bestComputerHands = [];
            bestComputerHands.push(allComputerHands[i]);
            isDraw = false;
            break;
          } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - j - 1] === allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - j - 1]) {
            continue;
          }
        }
        if(isDraw === true) {
          bestComputerHands.push(allComputerHands[i]);
        }
      }
      // Check Full House
      if(allComputerHands[i].score === 6000) {
        if(bestComputerHands[0].highThreeOfAKind[0] > allComputerHands[i].highThreeOfAKind[0]) {
          continue;
        } else if(bestComputerHands[0].highThreeOfAKind[0] < allComputerHands[i].highThreeOfAKind[0]) {
          bestComputerHands = [];
          bestComputerHands.push(allComputerHands[i]);
        } else if(bestComputerHands[0].highThreeOfAKind[0] === allComputerHands[i].highThreeOfAKind[0]) {
          if(bestComputerHands[0].highPairs[bestComputerHands[0].highPairs.length - 1] > allComputerHands[i].highPairs[allComputerHands[i].highPairs.length - 1]) {
            continue;
          } else if(bestComputerHands[0].highPairs[bestComputerHands[0].highPairs.length - 1] < allComputerHands[i].highPairs[allComputerHands[i].highPairs.length - 1]) {
            bestComputerHands = [];
            bestComputerHands.push(allComputerHands[i]);
          } else if(bestComputerHands[0].highPairs[bestComputerHands[0].highPairs.length - 1] === allComputerHands[i].highPairs[allComputerHands[i].highPairs.length - 1]) {
          bestComputerHands.push(allComputerHands[i]);            
          }
        }
      }
      // Check Four of a kind
      if(allComputerHands[i].score === 7000) {
        if(bestComputerHands[0].highFourOfAKind[0] > allComputerHands[i].highFourOfAKind[0]) {
          continue;
        } else if(bestComputerHands[0].highFourOfAKind[0] < allComputerHands[i].highFourOfAKind[0]) {
          bestComputerHands = [];
          bestComputerHands.push(allComputerHands[i]);
        } else if(bestComputerHands[0].highFourOfAKind[0] === allComputerHands[i].highFourOfAKind[0]) {
          if(bestComputerHands[0].highCard > allComputerHands[i].highCard) {
            continue;
          } else if(bestComputerHands[0].highCard < allComputerHands[i].highCard) {
            bestComputerHands = [];
            bestComputerHands.push(allComputerHands[i]);
          } else if(bestComputerHands[0].highCard === allComputerHands[i].highCard) {
            bestComputerHands.push(allComputerHands[i]);
          }
        }
      }
      // Check Straight Flush
      if(allComputerHands[i].score === 8000) {
        if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - 1] > allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - 1]) {
          continue;
        } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - 1] < allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - 1]) {
          bestComputerHands = [];
          bestComputerHands.push(allComputerHands[i]);
        } else if(bestComputerHands[0].bestFiveCards[bestComputerHands[0].bestFiveCards.length - 1] === allComputerHands[i].bestFiveCards[allComputerHands[i].bestFiveCards.length - 1]) {
          bestComputerHands.push(allComputerHands[i]);
        }
      }
    }
  }

  // Return best computer hands after being scored
  return bestComputerHands;
}

module.exports = {
  getUserResults,
  getComputerResults
}