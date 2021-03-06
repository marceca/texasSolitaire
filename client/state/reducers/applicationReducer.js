import React from 'react';
import * as types from '../actions/actions';
import STARTING_DECK from '../../assets/deck';
import * as getHands from '../helpers/functionsHelpers';

const initState = {
  dealt: false,
  deck: STARTING_DECK,
  handsDisplay: [[],[],[],[],[],[],[]],
  handObjects: [[],[],[],[],[],[],[]],
  communityCardsValue: [],
  communityCards: [],
  userHand: [],
  priorHands: {},
  chosenHand: true,
  choseHandThisTurn: true,
  chooseOncePerTurn: false,
  cardBack: '/settings_page/Red_Card_Back_Button.svg',
  name: null,
  profilePicture: ''
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

    // SOME SETTINGS
    case types.CHANGECARDBACK:
      const changeCardBackState =  Object.assign({}, state);
      changeCardBackState.cardBack = action.cardBack;
    return changeCardBackState

    case types.UPDATENUMBEROFHANDS:
      const updateNumberOfHandsState = Object.assign({}, state);
      let updateHandObject = [];
      let updateDisplayObject = [];
      for(let i = 0; i < action.numberOfHands; i++) {
        updateHandObject.push([]);
        updateDisplayObject.push([]);
      }

      updateNumberOfHandsState.handsDisplay = updateDisplayObject;
      updateNumberOfHandsState.handObjects = updateHandObject;
    return updateNumberOfHandsState;

    // GAME CONTROLS
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
            dealState.handsDisplay[i].push(<img key={card[0].name} className="card-image" src={dealState.cardBack} />)
          }
          cardsEach++
          dealState.userHand = dealState.handObjects[dealState.handObjects.length - 1];
        }
        dealState.handsDisplay[dealState.handsDisplay.length - 1] = []
        dealState.handsDisplay[dealState.handsDisplay.length - 1].push(<img key={dealState.userHand[0][0].name} className="card-image" src={dealState.userHand[0][0].img} />);
        dealState.handsDisplay[dealState.handsDisplay.length - 1].push(<img key={dealState.userHand[1][0].name} className="card-image" src={dealState.userHand[1][0].img} />);
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
        [userHandState.handsDisplay[userHandState.handsDisplay.length - 1][0], userHandState.handsDisplay[action.hand][0]] = [userHandState.handsDisplay[action.hand][0], userHandState.handsDisplay[userHandState.handsDisplay.length - 1][0]];
        [userHandState.handsDisplay[userHandState.handsDisplay.length - 1][1], userHandState.handsDisplay[action.hand][1]] = [userHandState.handsDisplay[action.hand][1], userHandState.handsDisplay[userHandState.handsDisplay.length - 1][1]];
        [userHandState.handObjects[userHandState.handsDisplay.length - 1], userHandState.handObjects[action.hand]] = [userHandState.handObjects[action.hand], userHandState.handObjects[userHandState.handsDisplay.length - 1]]
        userHandState.choseHandThisTurn = true;
        userHandState.chooseOncePerTurn = true;
      }
    return userHandState;

    case types.ALLOWSWITCH:
      const allowSwitchState = Object.assign({}, state);
      if(allowSwitchState.chooseOncePerTurn === false) {
        allowSwitchState.choseHandThisTurn = false;
        allowSwitchState.chooseOncePerTurn = true;
      }
    return allowSwitchState

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
          flopState.communityCards.push(<div key={card[0].name} className="community-card"><img key={card[0].name} className="card-image" src={card[0].img} /></div>)
          flop++
        }
      }
      flopState.choseHandThisTurn = true;
      flopState.chooseOncePerTurn = false;
    return flopState;

    case types.TURN:
      const turnState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (turnState.deck.length))
      // Random card from ranNum
      card = turnState.deck.splice(ranNum, 1)
      turnState.communityCardsValue.push(card)
      turnState.communityCards.push(<div key={card[0].name} className="community-card"><img key={card[0].name} className="card-image" src={card[0].img} /></div>)
      turnState.choseHandThisTurn = true;
      turnState.chooseOncePerTurn = false;
    return turnState;

    case types.RIVER:
      const riverState = Object.assign({}, state);
      // Random number for each card
      ranNum = Math.floor(Math.random() * (riverState.deck.length))
      // Random card from ranNum
      card = riverState.deck.splice(ranNum, 1)
      riverState.communityCardsValue.push(card)
      riverState.communityCards.push(<div key={card[0].name} className="community-card"><img key={card[0].name} className="card-image" src={card[0].img} /></div>)
      riverState.choseHandThisTurn = true;
      riverState.chooseOncePerTurn = false;
    return riverState;

    case types.RESULTS:
      const resultsState = Object.assign({}, state);
      // Flip all cards
      for(let i = 0; i <  resultsState.handsDisplay.length - 1; i++) {
        resultsState.handsDisplay[i] = [];
        resultsState.handsDisplay[i].push(<img key={resultsState.handObjects[i][0][0].name} className="card-image" src={resultsState.handObjects[i][0][0].img} />);
        resultsState.handsDisplay[i].push(<img key={resultsState.handObjects[i][1][0].name} className="card-image" src={resultsState.handObjects[i][1][0].img} />);
      }

      // Get user total cards including community
      for(let i = 0; i < resultsState.communityCards.length; i++) {
        resultsState.userHand.push(resultsState.communityCardsValue[i])
      }

      // Test hands for computer results
      // resultsState.handObjects = [
      //   // 1st comp hand
      //   [
      //     [{
      //     value: 14,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 7,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }]],
      //   [
      //     [{
      //     value: 7,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 8,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }]],
      //   // dead comp hand
      //   [
      //     [{
      //     value: 2,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 3,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }]],
      // ]

      // // // Changing community card value for testing
      // resultsState.communityCardsValue = [
      //   [{
      //     value: 2,
      //     name: 'Four of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 3,
      //     name: 'Five of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }],
      //   [{
      //     value: 4,
      //     name: 'Nine of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/4C.png'
      //   }],
      //   [{
      //     value: 5,
      //     name: 'Fve of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/5C.png'
      //   }],
      //   [{
      //     value: 10,
      //     name: 'Six of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/6C.png'
      //   }]
      // ]

      // // For testing user results
      // resultsState.userHand = [
      //   [{
      //     value: 2,
      //     name: 'Two of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/2C.png'
      //   }],
      //   [{
      //     value: 3,
      //     name: 'Three of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/3C.png'
      //   }],
      //   [{
      //     value: 4,
      //     name: 'Five of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/4C.png'
      //   }],
      //   [{
      //     value: 5,
      //     name: 'Fve of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/5C.png'
      //   }],
      //   [{
      //     value: 10,
      //     name: 'Six of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/6C.png'
      //   }],
      //   [{
      //     value: 8,
      //     name: 'Ten of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/7C.png'
      //   }],
      //   [{
      //     value: 14,
      //     name: 'Ten of Clubs',
      //     suit: 'Spades',
      //     img: '/cards/8C.png'
      //   }],
      // ]

      // Sort user hand
      userSort(resultsState.userHand)

      // Get user results
      let userResult = getHands.getUserResults(resultsState.userHand);
      
      // Get computer results
      let computerResult = getHands.getComputerResults(resultsState);

      console.log('user result ', userResult)
      console.log('computer result ', computerResult)
      let winningComputerHand = [];
      // for(let i = 0; i < computerResult.length; i  ++) {
        
      // }
      if(userResult.score > computerResult.score) {
        console.log('Player wins')
      }
      if(computerResult.score > userResult.score) {
        console.log(`Computer hand number ${computerResult.computerHand} won`)
      }
      // Same type of hand check
      if(userResult.score === computerResult.score) {
        // Check tie of one pair
        if(computerResult.score === 1000) {
          if(Math.max(...userResult.highPairOfWinningHand) > Math.max(...computerResult.highPairOfWinningHand)) {
            console.log('Player won single pair');
          }
          if(Math.max(...computerResult.highPairOfWinningHand) > Math.max(...userResult.highPairOfWinningHand)) {
            console.log('Computer won single pair');
          }
          // Check next 3 high cards
          if(Math.max(...computerResult.highPairOfWinningHand === Math.max(...userResult.highPairOfWinningHand))) {
            
          }
        }
        // If the player and computer best hand is a pair, two pair, three of a kind, straight, 
        // full house, or four of a kind check for highest pair or high card
        if(computerResult.score === 2000 || computerResult.score === 3000 || computerResult.score === 6000 || computerResult.score === 7000) {
          // Check if player has higher pair, three of a kind, or four of a kind
          if(Math.max(...userResult.highPairOfWinningHand) > Math.max(...computerResult.highPairOfWinningHand)) {
            console.log('Player won')
          }
          // Check if computer has higher pair, three of a kind, or four of a kind
          if(Math.max(...computerResult.highPairOfWinningHand) > Math.max(...userResult.highPairOfWinningHand)) {
            console.log(`Computer hand number ${computerResult.computerHand} won`)
          }
          // Check second pair if high pair is the same

          if(Math.max(...userResult.highPairOfWinningHand) === Math.max(...computerResult.highPairOfWinningHand)) {
            // If highest two pair is the same check the second pair
            if(userResult.highPairOfWinningHand.length > 1) {
              if(Math.min(...userResult.highPairOfWinningHand) > Math.min(...computerResult.highPairOfWinningHand)) {
                console.log('Player won')
              } else if(Math.min(...computerResult.highPairOfWinningHand) > Math.min(...userResult.highPairOfWinningHand)) {
                console.log(`Computer hand number ${computerResult.computerHand} won`)                
              }
              // Check high cards on two pair if both are the same
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