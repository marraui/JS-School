import { SELECT_INTERVAL, UPDATE_INTERVAL } from '../constants/action-types';
import defaultInterval from '../constants/default-interval';

export default function selectedInterval(state = defaultInterval, action) {
  if (action.type === SELECT_INTERVAL) return action.payload;
  if (action.type === UPDATE_INTERVAL && action.payload.id === state.id) return action.payload;

  return state;
}
