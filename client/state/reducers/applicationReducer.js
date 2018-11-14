import React from 'react'
import * as types from '../actions/actions';
import STARTING_DECK from '../../assets/deck'
import * as getHands from '../helpers/functionsHelpers';

const initState = {
  dealt: false,
  deck: STARTING_DECK,
  handsDisplay: [[],[],[], []],
  handObjects: [[],[],[], []],
  communityCardsValue: [],
  communityCards: [],
  userHand: false,
  priorHands: {},
  chosenHand: false,
  choseHandThisTurn: false
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
        userHandState.choseHandThisTurn = true;
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
      flopState.choseHandThisTurn = false;
    return flopState;

    case types.TURN:
      const turnState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (turnState.deck.length))
      // Random card from ranNum
      card = turnState.deck.splice(ranNum, 1)
      turnState.communityCardsValue.push(card)
      turnState.communityCards.push(<img key={card[0].name} className="card-image" src={card[0].img} />)
      turnState.choseHandThisTurn = false;
    return turnState;

    case types.RIVER:
      const riverState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (riverState.deck.length))
      // Random card from ranNum
      card = riverState.deck.splice(ranNum, 1)
      riverState.communityCardsValue.push(card)
      riverState.communityCards.push(<img key={card[0].name} className="card-image" src={card[0].img} />)
      riverState.choseHandThisTurn = false;
    return riverState;

    case types.RESULTS:
      const resultsState = Object.assign({}, state);
      
      // Get user total cards including community
      for(let i = 0; i < resultsState.communityCards.length; i++) {
        resultsState.userHand.push(resultsState.communityCardsValue[i])
      }
      // Sort user hand
      sort(resultsState.userHand)
      let userResult = getHands.getUserResults(resultsState.userHand);
      let computerResult = getHands.getComputerResults(resultsState);
      console.log(userResult)
    return resultsState

  default:
    return state
  }
}

export default applicationReducer;