import { SEARCH_BOOK } from '../constants/action-types';

export default function search(state = '', action) {
  if (action.type === SEARCH_BOOK) {
    return action.payload === undefined || action.payload === null ? state : action.payload;
  }
  return state;
}
