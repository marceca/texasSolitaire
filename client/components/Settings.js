import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application
  }
}

class Settings extends Component {
  closeSettings() {
    store.dispatch(types.closeSettings());
  }

  change_background_image() {
    store.dispatch(types.changeBackgroundImage());
  }

  change_card_back() {
    store.dispatch(types.changeCardBack());
  }

  render() {
    return (
      <div className="settings-container">
        <div className="settings-icons top-buffer"><p className="settings-text">Settings</p><img onClick={() => this.closeSettings()} className="white-x-icon" src="/settings_page/White_X.svg" /></div>
        <div className="settings-icons"><p className="settings-text">SFX</p><img className="on-off-icon" src="/settings_page/ON_Button.svg" /></div>
        <div className="settings-icons"><p className="settings-text">Show Cards</p><img className="on-off-icon" src="/settings_page/ON_Button.svg" /></div>
        <div className="settings-icons"><p className="settings-text">Total Number of Hands</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
        <div onClick={() => this.change_background_image()} className="settings-icons"><p className="settings-text">Change Background</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
        <div onClick={() => this.change_card_back()} className="settings-icons"><p className="settings-text">Change Card Backs</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
        <div className="settings-icons"><p className="settings-text">Hand Ranks</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
        <div className="settings-icons"><p className="settings-text">Contact Us / Feedback</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
        <div className="settings-icons"><p className="settings-text">Tutorial</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
        <div className="settings-icons"><p className="settings-text">Website</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
        <div className="settings-icons"><p className="settings-text">Menu Screen</p><img className="blue-icon" src="/settings_page/Blue_Arrow_Button.svg" /></div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Settings)