import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../../state/actions/actions';
import store from '../../state/store';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Total_Number_Of_Hands extends Component {
  closeTotalNumberOfHands() {
    console.log('here')

    store.dispatch(types.closeTotalNumberOfHands());
  }

  render() {
    return(
      <div className="secondary-settings-conatiner background-image-change">
        <div  className="background-image-top-bar">
          <p className="background-image-header">Total Number of Hands</p>
          <img onClick={() => this.closeTotalNumberOfHands()} className="white-x-icon" src="/settings_page/White_X.svg" />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Total_Number_Of_Hands);
