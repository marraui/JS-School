import { SELECT_INTERVAL } from '../constants/action-types';

export default function selectedInterval(state = {
  start: 0,
  end: null,
  id: 0,
  title: 'Full clip',
}, action) {
  if (action.type === SELECT_INTERVAL) {
    return action.payload;
  }

  return state;
}
