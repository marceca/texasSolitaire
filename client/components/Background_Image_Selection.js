import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application
  }
}

class Background_Image_Selection extends Component {
  backgroundImageClose() {
    store.dispatch(types.backgroundImageClose(types.BACKGROUNDIMAGECLOSE))
  }

  render() {
    return(
      <div className="secondary-settings-conatiner background-image-change">
        <div  className="background-image-top-bar">
          <p className="background-image-header">Backgrounds</p>
          <img onClick={() => this.backgroundImageClose()} className="white-x-icon" src="/settings_page/White_X.svg" />
        </div>
        <img className="background-image" src="/backgrounds/brown_design_hardwood.jpg" />
        <img className="background-image" src="/backgrounds/Dark_Stone.jpg" />
        <img className="background-image" src="/backgrounds/Dogs_Playing_Poker.jpg" />
        <img className="background-image" src="/backgrounds/Light_Rays.png" />
        <img className="background-image" src="/backgrounds/Ocean.jpg" />
        <img className="background-image" src="/backgrounds/Peaceful_Lake.jpg" />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Background_Image_Selection);