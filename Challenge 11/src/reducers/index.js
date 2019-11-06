import { combineReducers } from 'redux';
import intervals from './intervals';
import selectedInterval from './selected-interval';

const rootReducer = combineReducers({
  intervals,
  selectedInterval,
});

export default rootReducer;
