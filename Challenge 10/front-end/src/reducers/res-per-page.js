import { RES_PER_PAGE } from '../constants/action-types';

export default function resPerPage(state = 0, action) {
  if (action.type === RES_PER_PAGE) {
    return action.payload ? action.payload : state;
  }

  return state;
}
