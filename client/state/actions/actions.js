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
const OPENCARDBACK = 'OPENCARDBACK';
const CLOSECARDBACK = 'CLOSECARDBACK';
const CHANGECARDBACK = 'CHANGECARDBACK';
const OPENTOTALNUMBEROFHANDS = 'OPENTOTALNUMBEROFHANDS';
const CLOSETOTALNUMBEROFHANDS =  'CLOSETOTALNUMBEROFHANDS';
const OPENHANDRANKS = 'OPENHANDRANKSOPEN';
const OPENTUTORIAL = 'OPENTUTORIAL';

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
const openCardBack = () => ({type: OPENCARDBACK});
const closeCardBack = () => ({type: CLOSECARDBACK});
const changeCardBack = (cardBack) => ({type: CHANGECARDBACK, cardBack});
const openTotalNumberOfHands = () => ({type: OPENTOTALNUMBEROFHANDS});
const closeTotalNumberOfHands = () => ({type: CLOSETOTALNUMBEROFHANDS});
const openHandRanks = () => ({type: OPENHANDRANKS});
const openTutorial = () => ({type: OPENTUTORIAL});

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
  OPENCARDBACK,
  openCardBack,
  CLOSECARDBACK,
  closeCardBack,
  CHANGECARDBACK,
  changeCardBack,
  OPENTOTALNUMBEROFHANDS,
  openTotalNumberOfHands,
  CLOSETOTALNUMBEROFHANDS,
  closeTotalNumberOfHands,
  OPENHANDRANKS,
  openHandRanks,
  OPENTUTORIAL,
  openTutorial
}