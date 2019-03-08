import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../state/store';
import * as types from '../../state/actions/actions';

const mapStateToProps = (state) => {
  return {
    game: state.application,
    settings: state.settings
  }
}

class Num_Hands extends Component {
  update_num_hands(numberOfHands) {
    console.log(this.props)
    store.dispatch(types.updateNumberOfHands(numberOfHands))
  }
  
  render() {
    return (
      <div className="num-hands-container">
        <img onClick={() => this.update_num_hands(2)} src="/settings_page/Number_1_Button.svg" />
        <img onClick={() => this.update_num_hands(3)} src="/settings_page/Number_2_Button.svg" />
        <img onClick={() => this.update_num_hands(4)} src="/settings_page/Number_3_Button.svg" />
        <img onClick={() => this.update_num_hands(5)} src="/settings_page/Number_4_Button.svg" />
        <img onClick={() => this.update_num_hands(6)} src="/settings_page/Number_5_Button.svg" />
        <img onClick={() => this.update_num_hands(7)} src="/settings_page/Number_6_Button.svg" />
        <img onClick={() => this.update_num_hands(8)} src="/settings_page/Number_7_Button.svg" />
        <img onClick={() => this.update_num_hands(9)} src="/settings_page/Number_8_Button.svg" />
        <img onClick={() => this.update_num_hands(10)} src="/settings_page/Number_9_Button.svg" />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Num_Hands);