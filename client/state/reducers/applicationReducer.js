import React from 'react'
import * as types from '../actions/actions';
import STARTING_DECK from '../../assets/deck'
import * as getHands from '../helpers/functionsHelpers';

const initState = {
  dealt: false,
  deck: STARTING_DECK,
  handsDisplay: [[],[],[], [],[],[]],
  handObjects: [[],[],[], [],[],[]],
  communityCardsValue: [],
  communityCards: [],
  userHand: false,
  priorHands: {},
  chosenHand: false,
  choseHandThisTurn: false
}

// Sort user hand by card value
function userSort(userSorting) {
  for(let i = 0; i < userSorting.length; i++) {
    if(i != userSorting.length - 1) {
      if(userSorting[i][0].value > userSorting[i + 1][0].value) {
        [userSorting[i], userSorting[i + 1]] = [userSorting[i + 1], userSorting[i]]
        userSort(userSorting)
      }
    }
  }
  return userSorting;
}

// Sort computer hand by card value
function computerSort(compSorting) {
  for(let i = 0; i < compSorting.wholeHand.length; i++) {
    if(i != compSorting.wholeHand.length - 1) {
      if(compSorting.wholeHand[i] > compSorting.wholeHand[i + 1]) {
        [compSorting.wholeHand[i], compSorting.wholeHand[i + 1]] = [compSorting.wholeHand[i + 1], compSorting.wholeHand[i]]
        computerSort(compSorting)
      }
    }
  }
  return compSorting
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
      userSort(resultsState.userHand)
      // Get user results
      let userResult = getHands.getUserResults(resultsState.userHand);
      // Get computer results
      let computerResult = getHands.getComputerResults(resultsState);
      // Sort computer hand
      computerSort(computerResult)

      // test hands
      // player test hand
      userResult.highPairOfWinningHand = [5]
      userResult.highCard = 13
      userResult.score = 1000
      // computer test hand
      computerResult.highPairOfWinningHand = [6]
      computerResult.highCard = 13
      computerResult.score = 1000

      console.log('user result ', userResult)
      console.log('computer result ', computerResult)

      if(userResult.score > computerResult.score) {
        console.log('Player wins')
      }
      if(computerResult.score > userResult.score) {
        console.log(`Computer hand number ${computerResult.computerHand} won`)
      }
      // Same type of hand check
      if(userResult.score === computerResult.score) {
        // If the player and computer best hand is a pair, two pair, three of a kind, straight, 
        // full house, or four of a kind check for highest pair or high card
        if(computerResult.score === 1000 || computerResult.score === 2000 || computerResult.score === 3000 || computerResult.score === 6000 || computerResult.score === 7000) {
          // Check if player has higher pair
          if(Math.max(...userResult.highPairOfWinningHand) > Math.max(...computerResult.highPairOfWinningHand)) {
            console.log('Player won')
          }
          // Check if computer has higher pair
          if(Math.max(...computerResult.highPairOfWinningHand) > Math.max(...userResult.highPairOfWinningHand)) {
            console.log(`Computer hand number ${computerResult.computerHand} won`)
          }
          if(Math.max(...userResult.highPairOfWinningHand) === Math.max(...computerResult.highPairOfWinningHand)) {
            // Two pair check second pair
            if(userResult.highPairOfWinningHand.length > 1) {
              console.log('in one pair')
              if(Math.min(...userResult.highPairOfWinningHand) > Math.min(...computerResult.highPairOfWinningHand)) {
                console.log('Player won')
              } else if(Math.min(...computerResult.highPairOfWinningHand) > Math.min(...userResult.highPairOfWinningHand)) {
                console.log(`Computer hand number ${computerResult.computerHand} won`)                
              }
              // Check high cards on two pair
              if(Math.min(...userResult.highPairOfWinningHand) === Math.min(...computerResult.highPairOfWinningHand)) {
                let draw = true;
                for(let i = 0; i < 5; i++) {
                  if(userResult.wholeHand[userResult.wholeHand.length - 1 - i] > computerResult.wholeHand[computerResult.wholeHand.length - 1 - i]) {
                    console.log('checkplayer won')
                    draw = false;
                    break;
                  }
                  if(computerResult.wholeHand[computerResult.wholeHand.length - 1 - i] > userResult.wholeHand[userResult.wholeHand.length - 1 - i]) {
                    console.log(`check Computer hand number ${computerResult.computerHand} won`)
                    draw = false;
                    break;
                  }
                }
                if(draw === true) {
                  console.log('Draw')
                }
              }
            }
          }
        }
        // Check Straight
        if(computerResult.score === 4000) {
          if(Math.max(userResult.highPairOfWinningHand) > Math.max(computerResult.highPairOfWinningHand)) {
            console.log('Player wins with a straight!')
          } else if(Math.max(computerResult.highPairOfWinningHand) > Math.max(userResult.highPairOfWinningHand)) {
            console.log(`Computer hand number ${computerResult.computerHand} won with a straight!`)
          } else if(Math.max(userResult.highPairOfWinningHand) === Math.max(computerResult.highPairOfWinningHand)) {
            console.log('Draw')
          }
        }
      }
    return resultsState

  default:
    return state
  }
}

export default applicationReducer;