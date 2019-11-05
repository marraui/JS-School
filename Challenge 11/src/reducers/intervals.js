import { ADD_INTERVAL } from '../constants/action-types';

export default function intervals(state = [], action) {
  if (action.type === ADD_INTERVAL) {
    return state.concat([action.payload]);
  }
  return state;
}
