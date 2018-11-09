import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application
  }
}
class App extends Component {

  deal(el,props) {
    let button = document.getElementById('game-button').innerHTML;
    console.log('props ', props)
    if(props.game.dealt === false) {
      store.dispatch(types.deal())
      document.getElementById('game-button').innerHTML = 'Flop';
    }
    if(button === 'Flop' && props.game.chosenHand != false) {
      store.dispatch(types.flop());
      document.getElementById('game-button').innerHTML = 'Turn';
    }
    if(button === 'Turn') {
      store.dispatch(types.turn());
      document.getElementById('game-button').innerHTML = 'River';
    }
    if(button === 'River') {
      store.dispatch(types.river());
      document.getElementById('game-button').innerHTML = 'Results';
    }
    if(button === 'Results') {
      store.dispatch(types.results());
      document.getElementById('game-button').innerHTML = 'Reset';
    }
  }

  changeHands(id) {
    store.dispatch(types.userHand(id))
  }
  
  render() {
    return (
      console.log('render',this.props),
      <div className="game-container">
        <div>
          Your hand: {this.props.game.chosenHand}
        </div>
        <div className="community-card-container">
          <div>
            <h1>Community cards</h1>
            {this.props.game.communityCards}
          </div>
        </div>
        <div className="player-hands-container">
          <div>
            <h1 onClick={(e) => this.changeHands(0)}>Hand one</h1>
            {this.props.game.handsDisplay[0]}
          </div>
          <div>
            <h1 onClick={(e) => this.changeHands(1)}>Hand two</h1>
            {this.props.game.handsDisplay[1]}
          </div>
          <div>
            <h1 onClick={(e) => this.changeHands(2)}>Hand three</h1>
            {this.props.game.handsDisplay[2]}
          </div>
        </div>
        <button id="game-button" onClick={(e) => this.deal(e,this.props)} >click</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
