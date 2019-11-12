import { combineReducers } from 'redux';
import intervals from './intervals';
import selectedInterval from './selected-interval';
import searchValue from './search-value';

const rootReducer = combineReducers({
  intervals,
  selectedInterval,
  searchValue,
});

export default rootReducer;
