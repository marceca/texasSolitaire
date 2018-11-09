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
    if(props.game.dealt === false) {
      store.dispatch(types.deal())
      document.getElementById('game-button').innerHTML = 'Flop';
    }
    if(button === 'Flop') {
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
  }

  changeHands(id) {
    console.log('here', id)
  }
  
  render() {
    return (
      console.log('render',this.props),
      <div className="game-container">
        <div className="community-card-container">
          <div>
            <h1>Community cards</h1>
            {this.props.game.communityCards}
          </div>
        </div>
        <div className="player-hands-container">
          <div>
            <h1 onClick={(e) => this.changeHands('hand-one')}>Hand one</h1>
            {this.props.game.handsDisplay[0]}
          </div>
          <div>
            <h1 onClick={(e) => this.changeHands('hand-two')}>Hand two</h1>
            {this.props.game.handsDisplay[1]}
          </div>
          <div>
            <h1 onClick={(e) => this.changeHands('hand-three')}>Hand three</h1>
            {this.props.game.handsDisplay[2]}
          </div>
        </div>
        <button id="game-button" onClick={(e) => this.deal(e,this.props)} >click</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
