import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';
import settingsReducer  from './settingsReducer';

const reducers = combineReducers({
  application: applicationReducer,
  settings: settingsReducer
})

export default reducers;