import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const mapStateToProps = (state) => {
  return{
    game: state.application,
    settings: state.settings
  }
}

class Tutorial extends Component {
  next_page() {
    store.dispatch(types.tutorialPage())

  }
  render() {
    return(
      <div onClick={() => this.next_page()} className="tutorial_modal">
        {this.props.settings.tutorial_page === 1 ? <img src="/tutorial/Tutorial_Page_1.svg" /> : null}
        {this.props.settings.tutorial_page === 2 ? <img src="/tutorial/Tutorial_Page_2.svg" /> : null}
        {this.props.settings.tutorial_page === 3 ? <img src="/tutorial/Tutorial_Page_3.svg" /> : null}
        {this.props.settings.tutorial_page === 4 ? <img src="/tutorial/Tutorial_Page_4.svg" /> : null}
        {this.props.settings.tutorial_page === 5 ? <img src="/tutorial/Tutorial_Page_5.svg" /> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Tutorial)