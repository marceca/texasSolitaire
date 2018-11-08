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

  run() {
    store.dispatch(types.deal())
  }
  
  render() {
    return (
      console.log('render',this.props),
      <div>
        <button onClick={this.run} >click</button>
        <div>
          <h1>Hand one</h1>
          {this.props.game.hands[0]}
          <h1>Hand  two</h1>
          {this.props.game.hands[1]}
          <h1>Hand three</h1>
          {this.props.game.hands[2]}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
