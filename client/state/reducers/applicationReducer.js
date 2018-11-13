import React from 'react'
import * as types from '../actions/actions';
import STARTING_DECK from '../../assets/deck'

const initState = {
  dealt: false,
  deck: STARTING_DECK,
  handsDisplay: [[],[],[]],
  handObjects: [[],[],[]],
  communityCardsValue: [],
  communityCards: [],
  userHand: false,
  priorHands: {},
  chosenHand: false
}

// Sort hand by card value
function sort(sorting) {
  for(let i = 0; i < sorting.length; i++) {
    if(i != sorting.length - 1) {
      if(sorting[i][0].value > sorting[i + 1][0].value) {
        [sorting[i], sorting[i + 1]] = [sorting[i + 1], sorting[i]]
        sort(sorting)
      }
    }
  }
  return sorting;
}

const applicationReducer = (state = initState, action)=> {
  switch (action.type) {
    case types.DEAL:
      const dealState = Object.assign({}, state);
      let card, ranNum;
      let cardsEach = 0
      if(dealState.dealt === false) {
        while(cardsEach < 2) {
          for(let i = 0; i < dealState.handsDisplay.length; i++) {
            // Random number for each card
            ranNum = Math.floor(Math.random() * (dealState.deck.length))
            // Random card from ranNum
            card = dealState.deck.splice(ranNum, 1)
            dealState.handObjects[i].push(card)
            dealState.handsDisplay[i].push(<img key={card[0].name} className="card-image" src={'/cards/blue_back.png'} />)
          }
          cardsEach++
        }
        dealState.dealt = true;
      }
    return dealState;

    case types.USERHAND:
      const userHandState = Object.assign({}, state);
      if(!userHandState.priorHands[action.hand] && userHandState.dealt === true) {
        userHandState.userHand = userHandState.handObjects[action.hand];
        userHandState.priorHands[action.hand] = true;
        userHandState.handsDisplay[action.hand] = [];
        userHandState.handsDisplay[action.hand].push(<img key={userHandState.userHand[0][0].name} className="card-image" src={userHandState.userHand[0][0].img} />);
        userHandState.handsDisplay[action.hand].push(<img key={userHandState.userHand[1][0].name} className="card-image" src={userHandState.userHand[1][0].img} />);
        userHandState.chosenHand = action.hand + 1;
      }
    return userHandState;

    case types.FLOP:
      const flopState = Object.assign({}, state);
      let flop = 0;
      if(flopState.chosenHand != false) {
        while(flop < 3) {
          // Random number for each card
          ranNum = Math.floor(Math.random() * (flopState.deck.length))
          // Random card from ranNum
          card = flopState.deck.splice(ranNum, 1)
          flopState.communityCardsValue.push(card)
          flopState.communityCards.push(<img key={card[0].name} className="card-image" src={card[0].img} />)
          flop++
        }
      }
    return flopState;

    case types.TURN:
      const turnState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (turnState.deck.length))
      // Random card from ranNum
      card = turnState.deck.splice(ranNum, 1)
      turnState.communityCardsValue.push(card)
      turnState.communityCards.push(<img key={card[0].name} className="card-image" src={card[0].img} />)
    return turnState;

    case types.RIVER:
      const riverState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (riverState.deck.length))
      // Random card from ranNum
      card = riverState.deck.splice(ranNum, 1)
      riverState.communityCardsValue.push(card)
      riverState.communityCards.push(<img key={card[0].name} className="card-image" src={card[0].img} />)
    return riverState;

    case types.RESULTS:
      const resultsState = Object.assign({}, state);
      let userResult = {
        score: 0,
        highCard: 0
      };
      let computerResult = {};


      let userCardCount = {};
      let userStraightCount = [];
      let userFlush = {};
      let straightCounter = 0;
      let straightFlushCount = 0;
      let possibleStraightFlush = '';

      let flushCountIfPossible = 0;
      let checkStraightFlush = [];
      let checkStraightFlushCount = 0;
      
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
      
      // Get user total cards including community
      for(let i = 0; i < resultsState.communityCards.length; i++) {
        resultsState.userHand.push(resultsState.communityCardsValue[i])
      }
      // Sort user hand
      sort(resultsState.userHand)
      console.log('sorted user hand ', resultsState)
      // Get user best hand
      for(let i = 0; i < resultsState.userHand.length; i++) {
        // Get card counts
        if(userCardCount[resultsState.userHand[i][0].value]) {
          userCardCount[resultsState.userHand[i][0].value] += 1;
        } else {
          userCardCount[resultsState.userHand[i][0].value] = 1;
        }
        // Get suit counts
        if(userFlush[resultsState.userHand[i][0].suit]) {
          userFlush[resultsState.userHand[i][0].suit] += 1;
          if(userFlush[resultsState.userHand[i][0].suit] > flushCountIfPossible) {
            possibleStraightFlush = resultsState.userHand[i][0].suit;
          }
        } else {
          userFlush[resultsState.userHand[i][0].suit] = 1;
        }
        // Set high card to score
        if(resultsState.userHand[i][0].value > userResult.score) {
          userResult.highCard = resultsState.userHand[i][0].value;
        }
        // Getting all card values to check for straight
        userStraightCount.push(resultsState.userHand[i][0].value)
      }
      // Get pair amounts
      let pairCount = {
        'pair': 0,
        'three': 0,
        'four': 0
      }

      for(let key in userCardCount) {
        if(userCardCount[key] === 2) {
          pairCount['pair'] += 1;
        }
        if(userCardCount[key] === 3) {
          pairCount['three'] += 1
        }
        if(userCardCount[key] === 4) {
          pairCount['four'] += 1
        }
      }

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
      let testHand = [
        [{
          value: 2,
          suit: 'Hearts'
        }],
        [{
          value: 3,
          suit: 'Hearts'
        }],
        [{
          value: 5,
          suit: 'Diamonds'
        }],
        [{
          value: 4,
          suit: 'Hearts'
        }],
        [{
          value: 5,
          suit: 'Hearts'
        }],
        [{
          value: 5,
          suit: 'Diamonds'
        }],
        [{
          value: 6,
          suit: 'Hearts'
        }],
      ]
      
      // Get values for Straight Flush check
      for(let i = 0; i < resultsState.userHand.length; i++) {
        if(resultsState.userHand[i][0].suit === possibleStraightFlush) {
          checkStraightFlush.push(resultsState.userHand[i][0].value)
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
      userResult.score += userResult.highCard
      console.log('straight flush count ', straightFlushCount)
      console.log('user result ', userResult)
      console.log('results state at end ',resultsState)
    return resultsState

  default:
    return state
  }
}

export default applicationReducer;