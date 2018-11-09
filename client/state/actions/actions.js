const DEAL = 'DEAL';
const FLOP = 'FLOP';
const TURN = 'TURN';
const RIVER = 'RIVER';

const deal = () => ({type: DEAL});
const flop = () => ({type: FLOP});
const turn = () => ({type: TURN});
const river = () => ({type: RIVER});

module.exports = {
  DEAL,
  deal,
  FLOP,
  flop,
  TURN,
  turn,
  RIVER,
  river
}