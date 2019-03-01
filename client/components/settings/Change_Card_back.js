import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Change_Card_Back extends Component {

  cardBackClose() {
    store.dispatch(types.closeCardBack());
  }

  changeCardBack(e) {
    console.log(e.target.src)
    store.dispatch(types.changeCardBack(e.target.src))
  }
  render() {
    return (
      <div className="secondary-settings-conatiner background-image-change change-card-back-container">
        <div  className="background-image-top-bar">
          <p className="background-image-header">Change Card Back</p>
          <img onClick={() => this.cardBackClose()} className="white-x-icon" src="/settings_page/White_X.svg" />
        </div>
        <div className="flex-column">
          <div className="flex-row padding-top-10px">
            <img onClick={(e) => this.changeCardBack(e)} className="card-change-image" src="/settings_page/Blue_Card_Back_Button.svg" />
            <img onClick={(e) => this.changeCardBack(e)} className="card-change-image" src="/settings_page/Red_Card_Back_Button.svg" />
          </div>
          <div className="flex-row">
            <img onClick={(e) => this.changeCardBack(e)} className="card-change-image" src="/settings_page/Deadly_Woman_Card_Back_Button.svg" />
            <img onClick={(e) => this.changeCardBack(e)} className="card-change-image" src="/settings_page/Logo_Card_Back_Button.svg" />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Change_Card_Back);