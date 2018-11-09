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
      let userResult, computerResult;
      const winningHandsKey = {
        'Straight Flush': 8,
        'Four of a Kind': 7,
        'Fullhouse': 6,
        'Flush': 5,
        'Straight': 4,
        'Three of a Kind': 3,
        'Two Pair': 2,
        'A Pair': 1,
        'High Card': 0
      }

      // Get user total cards including community
      for(let i = 0; i < resultsState.communityCards.length; i++) {
        resultsState.userHand.push(resultsState.communityCardsValue[i])
      }
      // Get user best hand
      for(let i = 0; i < resultsState.userHand.length; i++) {
        console.log(resultsState.userHand[i])
        
      }
    return resultsState

  default:
    return state
  }
}

export default applicationReducer;