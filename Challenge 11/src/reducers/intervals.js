import { ADD_INTERVAL, UPDATE_INTERVAL, REMOVE_INTERVAL } from '../constants/action-types';
import defaultInterval from '../constants/default-interval';

export default function intervals(state = [defaultInterval], action) {
  if (action.type === ADD_INTERVAL) {
    return state.concat([action.payload]);
  }
  if (action.type === UPDATE_INTERVAL) {
    return state.map((interval) => {
      if (interval.id === action.payload.id) return action.payload;
      return interval;
    });
  }
  if (action.type === REMOVE_INTERVAL) {
    return state.filter((interval) => interval.id !== action.payload);
  }

  return state;
}
