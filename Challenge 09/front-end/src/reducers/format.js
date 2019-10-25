import { SELECT_FORMAT, UNSELECT_FORMAT } from '../constants/action-types';

export default function format(state = 'any', action) {
  if (action.type === SELECT_FORMAT) {
    return action.payload ? action.payload : state;
  }

  if (action.type === UNSELECT_FORMAT) {
    return 'any';
  }

  return state;
}
