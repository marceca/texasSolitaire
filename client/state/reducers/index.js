import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';

const reducers = combineReducers({
  application: applicationReducer
})

export default reducers;