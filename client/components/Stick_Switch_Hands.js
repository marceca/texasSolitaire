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

class Stick_Switch_Hands extends Component {
  changeHands(id, props) {
    if(props.game.choseHandThisTurn === false) {
      store.dispatch(types.userHand(id))
    }
  }
  
  render() {
    let mainGame = []
    for(let i = 0; i < this.props.game.handObjects.length - 1; i++) {
      mainGame.push(<div key={'handNumber'+i} className="possible-hand" onClick={(e) => this.changeHands(i, this.props)}>{this.props.game.handsDisplay[i]}</div>)
    }
    return (
      <div className="possible-hands-container">{mainGame}</div>
    )
  }
}

export default connect(mapStateToProps)(Stick_Switch_Hands);