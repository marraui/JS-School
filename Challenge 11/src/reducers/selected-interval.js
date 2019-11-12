import { SELECT_INTERVAL, UPDATE_INTERVAL } from '../constants/action-types';

export default function selectedInterval(state = {
  start: 0,
  end: null,
  id: 0,
  title: 'Full clip',
  tags: [],
}, action) {
  if (action.type === SELECT_INTERVAL) {
    return action.payload;
  }

  if (action.type === UPDATE_INTERVAL) {
    if (action.payload.id === state.id) {
      return action.payload;
    }
  }

  return state;
}
