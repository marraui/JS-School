import { SELECT_PAGE } from '../constants/action-types';

export default function page(state = 0, action) {
  if (action.type === SELECT_PAGE) {
    return action.payload ? action.payload : state;
  }

  return state;
}
