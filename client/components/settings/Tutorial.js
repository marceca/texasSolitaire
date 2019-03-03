import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return{
    game: state.application,
    settings: state.settings
  }
}

class Tutorial extends Component {
  render() {
    return(
      <div className="tutorial_modal">HI</div>
    )
  }
}

export default connect(mapStateToProps)(Tutorial)