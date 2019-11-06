import { SELECT_INTERVAL } from '../constants/action-types';

export default function selectedInterval(state = { start: 0, end: null }, action) {
  if (action.type === SELECT_INTERVAL) {
    return action.payload;
  }

  return state;
}
