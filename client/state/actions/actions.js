const DEAL = 'DEAL';
const FLOP = 'FLOP';
const TURN = 'TURN';
const RIVER = 'RIVER';
const USERHAND = 'USERHAND';
const RESULTS = 'RESULTS';
const ALLOWSWITCH = 'ALLOWSWITCH';

const deal = () => ({type: DEAL});
const flop = () => ({type: FLOP});
const turn = () => ({type: TURN});
const river = () => ({type: RIVER});
const userHand = (hand) => ({type: USERHAND, hand});
const results = () => ({type: RESULTS});
const allowSwitch = () => ({type: ALLOWSWITCH});

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
  allowSwitch
}