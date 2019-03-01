import React from 'react';
import * as types from '../actions/actions';

const initState = {
  settings: false,
  background_image: false,
  change_card_back: false
}

const settingsReducer = (state = initState, action)=> {
  switch(action.type) {
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
    return closeSettingsState;

    case types.CHANGEBACKGROUNDIMAGE:
      const changeBackgroundImageState = Object.assign({}, state)
      changeBackgroundImageState.change_card_back = false;
      changeBackgroundImageState.background_image = true;
    return changeBackgroundImageState;

    case types.BACKGROUNDIMAGECLOSE:
      const backgroundImageCloseState = Object.assign({}, state);
      backgroundImageCloseState.background_image = false;
    return backgroundImageCloseState;

    case types.OPENCARDBACK:
      const openCardBackState = Object.assign({}, state);
      openCardBackState.background_image = false;
      openCardBackState.change_card_back = true;
    return openCardBackState;

    case types.CLOSECARDBACK:
      const closeCardBackState = Object.assign({}, state);
      closeCardBackState.change_card_back = false;
    return closeCardBackState

  default:
    return state;
  }
}

export default settingsReducer;