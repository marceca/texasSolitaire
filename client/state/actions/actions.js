const DEAL = 'DEAL';
const FLOP = 'FLOP';
const TURN = 'TURN';
const RIVER = 'RIVER';
const USERHAND = 'USERHAND';
const RESULTS = 'RESULTS';
const ALLOWSWITCH = 'ALLOWSWITCH';
const SETTINGS = 'SETTINGS';
const CLOSESETTINGS = 'CLOSESETTINGS';
const CHANGEBACKGROUNDIMAGE = 'CHANGEBACKGROUNDIMAGE';
const BACKGROUNDIMAGECLOSE = 'BACKGROUNDIMAGECLOSE';
const CHANGECARDBACK = 'CHANGECARDBACK';

const deal = () => ({type: DEAL});
const flop = () => ({type: FLOP});
const turn = () => ({type: TURN});
const river = () => ({type: RIVER});
const userHand = (hand) => ({type: USERHAND, hand});
const results = () => ({type: RESULTS});
const allowSwitch = () => ({type: ALLOWSWITCH});
const settings = () => ({type: SETTINGS});
const closeSettings = () => ({type: CLOSESETTINGS});
const changeBackgroundImage = () => ({type: CHANGEBACKGROUNDIMAGE});
const backgroundImageClose = () => ({type: BACKGROUNDIMAGECLOSE});
const changeCardBack = () => ({type: CHANGECARDBACK});

module.exports = {
  DEAL,
  deal,
  FLOP,
  flop,
  TURN,
  turn,
  RIVER,
  river,
  USERHAND,
  userHand,
  RESULTS,
  results,
  ALLOWSWITCH,
  allowSwitch,
  SETTINGS,
  settings,
  CLOSESETTINGS,
  closeSettings,
  CHANGEBACKGROUNDIMAGE,
  changeBackgroundImage,
  BACKGROUNDIMAGECLOSE,
  backgroundImageClose,
  CHANGECARDBACK,
  changeCardBack
}