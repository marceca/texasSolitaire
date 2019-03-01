import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Change_Card_Back extends Component {
  render() {
    return (
      <div className="secondary-settings-conatiner background-image-change"></div>
    )
  }
}

export default connect(mapStateToProps)(Change_Card_Back);