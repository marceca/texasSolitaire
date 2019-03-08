import React from 'react';
import * as types from '../actions/actions';

const initState = {
  settings: false,
  background_image: false,
  change_card_back: false,
  total_hands: false,
  hand_ranks: false,
  tutorial: false,
  tutorial_page: 1,
  mainMenu: true,
  num_hands: false
}

const settingsReducer = (state = initState, action)=> {
  switch(action.type) {
    // GAME START
    case types.STARTGAME:
      const startGameState = Object.assign({}, state);
      startGameState.mainMenu = false;
    return startGameState;

    // CHANGE NUMBER OF HANDS
    case types.NUMBEROFHANDS:
      const numberOfHandsState = Object.assign({}, state);
      numberOfHandsState.num_hands = true;
    return numberOfHandsState;

    // SHOW MAIN MENU
    case types.SHOWMAINMENU:
      const showMainMenuState = Object.assign({}, state);
      showMainMenuState.mainMenu = true;
    return showMainMenuState;

    //SETTINGS CONTROLS
    case types.SETTINGS:
      const settingsState = Object.assign({}, state);
      settingsState.settings = true;
    return settingsState;

    case types.CLOSESETTINGS:
      const closeSettingsState = Object.assign({}, state);
      closeSettingsState.settings = false;
      closeSettingsState.background_image = false;
      closeSettingsState.change_card_back = false;
      closeSettingsState.total_hands = false;
      closeSettingsState.hand_ranks = false;
      closeSettingsState.tutorial = false;
    return closeSettingsState;

    case types.CHANGEBACKGROUNDIMAGE:
      const changeBackgroundImageState = Object.assign({}, state)
      changeBackgroundImageState.hand_ranks = false;
      changeBackgroundImageState.change_card_back = false;
      changeBackgroundImageState.total_hands = false;
      changeBackgroundImageState.tutorial = false;
      if(changeBackgroundImageState.background_image === true) {
        changeBackgroundImageState.background_image = false;
      } else {
        changeBackgroundImageState.background_image = true;
      }
    return changeBackgroundImageState;

    case types.BACKGROUNDIMAGECLOSE:
      const backgroundImageCloseState = Object.assign({}, state);
      backgroundImageCloseState.background_image = false;
    return backgroundImageCloseState;

    case types.OPENCARDBACK:
      const openCardBackState = Object.assign({}, state);
      openCardBackState.background_image = false;
      openCardBackState.total_hands = false;
      openCardBackState.hand_ranks = false;
      openCardBackState.tutorial = false;
      if(openCardBackState.change_card_back === true) {
        openCardBackState.change_card_back = false;
      } else {
        openCardBackState.change_card_back = true;
      }
    return openCardBackState;

    case types.CLOSECARDBACK:
      const closeCardBackState = Object.assign({}, state);
      closeCardBackState.change_card_back = false;
    return closeCardBackState

    case types.OPENTOTALNUMBEROFHANDS:
      const openTotalNumberOfHandsState = Object.assign({}, state);
      openTotalNumberOfHandsState.change_card_back = false;
      openTotalNumberOfHandsState.background_image = false;
      openTotalNumberOfHandsState.hand_ranks = false;
      openTotalNumberOfHandsState.tutorial = false;
      if(openTotalNumberOfHandsState.total_hands === true) {
        openTotalNumberOfHandsState.total_hands = false;
      } else {
        openTotalNumberOfHandsState.total_hands = true;
      }
    return openTotalNumberOfHandsState;

    case types.CLOSETOTALNUMBEROFHANDS:
      const closeTotalNumberOfHandsState = Object.assign({}, state);
      closeTotalNumberOfHandsState.total_hands = false;
    return closeTotalNumberOfHandsState;

    case types.OPENHANDRANKS:
      const handRanksOpenState = Object.assign({}, state);
      handRanksOpenState.change_card_back = false;
      handRanksOpenState.background_image = false;
      handRanksOpenState.total_hands = false;
      handRanksOpenState.tutorial = false;
      if(handRanksOpenState.hand_ranks === true) {
        handRanksOpenState.hand_ranks = false;
      } else {
        handRanksOpenState.hand_ranks = true;
      }
    return handRanksOpenState;

    case types.OPENTUTORIAL:
      const openTutorialState = Object.assign({},  state);
      openTutorialState.change_card_back = false;
      openTutorialState.background_image = false;
      openTutorialState.total_hands = false;
      openTutorialState.hand_ranks = false;
      if(openTutorialState.tutorial === true) {
        openTutorialState.tutorial = false;
      } else {
        openTutorialState.tutorial = true;
      }
    return openTutorialState;

      case types.TUTORIALPAGE:
        const tutorialPageState = Object.assign({}, state);
        tutorialPageState.tutorial_page++
        if(tutorialPageState.tutorial_page > 5) {
          tutorialPageState.tutorial_page = 1
          tutorialPageState.tutorial = false;
        }
      return tutorialPageState;

  default:
    return state;
  }
}

export default settingsReducer;