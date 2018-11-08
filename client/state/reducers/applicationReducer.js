import React from 'react'
import * as types from '../actions/actions';
import STARTING_DECK from '../../assets/deck'

const initState = {
  dealt: false,
  deck: STARTING_DECK,
  handsDisplay: [[],[],[]],
  handObjects: [[],[],[]],
  communityCardsValue: [],
  communityCards: []
}

const applicationReducer = (state = initState, action)=> {
  switch (action.type) {
    case types.DEAL:
      const dealState = Object.assign({}, state);
      let card, ranNum;
      let cardsEach = 0
      let flop = 0;
      if(dealState.dealt === false) {
        while(cardsEach < 2) {
          for(let i = 0; i < dealState.handsDisplay.length; i++) {
            // Random number for each card
            ranNum = Math.floor(Math.random() * (dealState.deck.length))
            // Random card from ranNum
            card = dealState.deck.splice(ranNum, 1)
            dealState.handObjects[i].push(card)
            dealState.handsDisplay[i].push(<img key={card[0].name} className="card-image" src={card[0].img} />)
          }
          cardsEach++
        }

        while(flop < 3) {
          // Random number for each card
          ranNum = Math.floor(Math.random() * (dealState.deck.length))
          // Random card from ranNum
          card = dealState.deck.splice(ranNum, 1)
          dealState.communityCardsValue.push(card)
          dealState.communityCards.push(<img key={card[0].name} className="card-image" src={card[0].img} />)
          flop++
        }
        dealState.dealt = true;
      }
    return dealState
  
  default:
    return state
  }
}

export default applicationReducer;