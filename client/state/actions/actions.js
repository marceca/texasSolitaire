const DEAL = 'DEAL';
const TURN = 'TURN';
const RIVER = 'RIVER';

const deal = () => ({type: DEAL})
const turn = () => ({type: TURN})
const river = () => ({type: RIVER})

module.exports = {
  DEAL,
  deal,
  TURN,
  turn,
  RIVER,
  river
}