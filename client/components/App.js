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

  deal(el, props) {
    let button = document.getElementById('game-button').innerHTML;
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

  changeHands(id, props) {
    if(props.game.choseHandThisTurn === false) {
      store.dispatch(types.userHand(id))
    }
  }
  
  playerCardOne() {
    if(this.props.game.userHand.length > 0) {
      return this.props.game.userHand[0][0].img
    }
  }
  playerCardTwo() {
    if(this.props.game.userHand.length > 0) {
      return this.props.game.userHand[1][0].img
    }
  }
  render() {
    // console.log(this.props.game.userHand)
    return (
      console.log(this.props),
      <div className="game-container">
        <div className="cards-container">
          <div className="player-hands-container">
            <div>
              <h1>Stick or Switch Cards</h1>
            </div>
            <div className="two-hands">
              <div onClick={(e) => this.changeHands(0, this.props)}>
                {this.props.game.handsDisplay[0]}
              </div>
              <div onClick={(e) => this.changeHands(1, this.props)}>
                {this.props.game.handsDisplay[1]}
              </div>
            </div>
            <div className="two-hands">
              <div onClick={(e) => this.changeHands(2, this.props)}>
                {this.props.game.handsDisplay[2]}
              </div>
              <div onClick={(e) => this.changeHands(3, this.props)}>
                {this.props.game.handsDisplay[3]}
              </div>
            </div>
            <div className="two-hands">
              <div onClick={(e) => this.changeHands(4, this.props)}>
                {this.props.game.handsDisplay[4]}
              </div>
              <div onClick={(e) => this.changeHands(5, this.props)}>
                {this.props.game.handsDisplay[5]}
              </div>
            </div>
          </div>
          <div className="community-card-container">
            <div>
              <h1>Community cards</h1>
              {this.props.game.communityCards}
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <div className="user-cards">
            <img className="card-image" src={this.playerCardOne()} />
            <img className="card-image" src={this.playerCardTwo()} />
          </div>
          <div>
            <button id="game-button" onClick={(e) => this.deal(e,this.props)} >click</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
