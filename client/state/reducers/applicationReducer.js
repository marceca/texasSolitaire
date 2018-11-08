import React from 'react'
import * as types from '../actions/actions';
import STARTING_DECK from '../../accessories/deck'

const initState = {
  dealt: false,
  deck: STARTING_DECK,
  hands: [[],[],[]],
  handObjects: [[],[],[]]
}

const applicationReducer = (state = initState, action)=> {
  switch (action.type) {
    case types.DEAL:
      const dealState = Object.assign({}, state);
      let card, ranNum;
      let cardsEach = 0
      if(dealState.dealt === false) {
        while(cardsEach < 2) {
          for(let i = 0; i < dealState.hands.length; i++) {
            // Random number for each card
            ranNum = Math.floor(Math.random() * (dealState.deck.length))
            // Random card from ranNum
            card = dealState.deck.splice(ranNum, 1)
            dealState.handObjects[i].push(card)
            dealState.hands[i].push(<div key={card[0].name}>Card: {card[0].name} -- Value: {card[0].value}</div>)
          }
          cardsEach++
        }
        dealState.dealt = true;
      }
    return dealState
  
  default:
    return state
  }
}

export default applicationReducer;