import { ADD_INTERVAL, UPDATE_INTERVAL } from '../constants/action-types';

export default function intervals(state = [{
  start: 0,
  end: null,
  title: 'Full clip',
  id: 0,
}], action) {
  if (action.type === ADD_INTERVAL) {
    return state.concat([action.payload]);
  }
  if (action.type === UPDATE_INTERVAL) {
    return state.map((interval) => {
      if (interval.id === action.payload.id) return action.payload;
      return interval;
    });
  }
  return state;
}
