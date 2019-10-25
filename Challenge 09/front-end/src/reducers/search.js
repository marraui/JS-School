import { SEARCH_BOOK } from '../constants/action-types';

export default function search(state = '', action) {
  if (action.type === SEARCH_BOOK) return action.payload ? action.payload : state;
  return state;
}
