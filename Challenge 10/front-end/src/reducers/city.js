import { SELECT_CITY, UNSELECT_CITY } from '../constants/action-types';

export default function city(state = 'any', action) {
  if (action.type === SELECT_CITY) {
    return action.payload ? action.payload : state;
  }

  if (action.type === UNSELECT_CITY) {
    return 'any';
  }

  return state;
}
