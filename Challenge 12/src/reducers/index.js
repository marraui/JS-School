import { combineReducers } from 'redux';
import attributes from './attributes';

const rootReducer = combineReducers({
  attributes,
  tabs: () => ['commands', 'other'],
});
export default rootReducer;
