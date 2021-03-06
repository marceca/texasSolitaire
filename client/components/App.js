import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../state/store';
import * as types from '../state/actions/actions';
import Settings from './Settings';
import Background_Image_Selection from './settings/Background_Image_Selection';
import Change_Card_Back from './settings/Change_Card_Back';
import Total_Number_Of_Hands from './settings/Total_Number_Of_Hands';
import Hand_Ranks from './settings/Hand_Ranks';
import Tutorial from './settings/Tutorial';
import Main_Menu from './Main_Menu';
import Stick_Switch_Hands from'./Stick_Switch_Hands';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
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

  switch() {
    store.dispatch(types.allowSwitch())
  }

  openSettings() {
    store.dispatch(types.settings())
  }
  
  playerCardOne() {
    if(this.props.game.userHand.length > 0) {
      return this.props.game.handsDisplay[this.props.game.chosenHand - 1][0]
    }
  }

  playerCardTwo() {
    if(this.props.game.userHand.length > 0) {
      return this.props.game.handsDisplay[this.props.game.chosenHand - 1][1]      
    }
  }

  render() {
    return (

      console.log('props ', this.props),
      <div className="background-image-container">
        {this.props.settings.mainMenu ? <Main_Menu /> : null}
        <div className="game-container">
          <div className="settings-icon" >
            <img onClick={() => this.openSettings()} src="/icons/settings.png" />
          </div>
          {/* Setting Pages */}
          {this.props.settings.tutorial ? <Tutorial /> : null}
          {this.props.settings.hand_ranks ? <Hand_Ranks /> : null}
          {this.props.settings.background_image ? <Background_Image_Selection /> : null}
          {this.props.settings.total_hands ? <Total_Number_Of_Hands /> : null}
          {this.props.settings.change_card_back ? <Change_Card_Back /> : null}
          { this.props.settings.settings ? <Settings /> : null}
          <div className="cards-container">
            <div className="player-hands-container">
              <Stick_Switch_Hands />

              {/* <div className="two-hands">
                <div className="possible-hand" onClick={(e) => this.changeHands(0, this.props)}>
                  {this.props.game.handsDisplay[0]}
                </div>
                <div className="possible-hand" onClick={(e) => this.changeHands(1, this.props)}>
                  {this.props.game.handsDisplay[1]}
                </div>
              </div>
              <div className="two-hands">
                <div className="possible-hand" onClick={(e) => this.changeHands(2, this.props)}>
                  {this.props.game.handsDisplay[2]}
                </div>
                <div className="possible-hand" onClick={(e) => this.changeHands(3, this.props)}>
                  {this.props.game.handsDisplay[3]}
                </div>
              </div>
              <div className="two-hands">
                <div className="possible-hand" onClick={(e) => this.changeHands(4, this.props)}>
                  {this.props.game.handsDisplay[4]}
                </div>
                <div className="possible-hand" onClick={(e) => this.changeHands(5, this.props)}>
                  {this.props.game.handsDisplay[5]}
                </div>
              </div> */}
            </div>
            <div className="community-card-container">
              <div>
                <div className="community-cards">
                  {this.props.game.communityCards}
                </div>
              </div>
            </div>
          </div>
          <div className="buttons-container">
            <div className="user-cards">
              <div className="possible-hand">
                {this.props.game.handsDisplay[this.props.game.handsDisplay.length - 1]}
              </div>
            </div>
            <div className="stick-switch-buttons">
              <button className="button stick" id="game-button" onClick={(e) => this.deal(e,this.props)} >Play</button>
              <button className="button switch" onClick={(e) => this.switch(e,this.props)}>Switch</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
