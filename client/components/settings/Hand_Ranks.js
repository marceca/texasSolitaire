import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Hand_Ranks extends Component {
  render() {
    return (
      <div className="secondary-settings-conatiner">
          <img src="/settings_page/Hand_Ranks_Page.svg" />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Hand_Ranks)