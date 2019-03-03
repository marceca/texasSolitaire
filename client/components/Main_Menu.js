import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Main_Menu extends Component {
  start_game() {
    store.dispatch(types.startGame())
  }
  render() {
    return (
      <div className="main_menu">
        <div className="top_main_menu">
          <div className="flex-row player_icon_name">
            <img src="/main_menu/Profile_Picture_Holder.svg" />
            <p className="player_name">{this.props.game.name ? this.props.game.name : 'Dead Eyes'}</p>
          </div>
          <img src="/main_menu/Profile_Picture_Holder.svg" />
        </div>
        <div className="mid_main_menu">
          <img className="play_button" src="/main_menu/Play_Button.svg" />
        </div>
        <div className="bottom_main_menu">
          <img src="/main_menu/Show_Cards_Button.svg" />
          <img src="/main_menu/Number_of_Hands_Button_Blue.svg" />
          <img onClick={() => this.start_game()} src="/main_menu/Flip_It_Button.svg" />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Main_Menu);