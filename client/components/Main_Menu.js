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
  render() {
    return (
      <div>Hi</div>
    )
  }
}

export default connect(mapStateToProps)(Main_Menu);