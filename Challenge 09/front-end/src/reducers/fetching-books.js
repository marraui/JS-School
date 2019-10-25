import { FETCHING_BOOKS, BOOKS_FETCHED } from '../constants/action-types';

export default function fetchingBooks(state = false, action) {
  if (action.type === FETCHING_BOOKS) {
    return true;
  }
  if (action.type === BOOKS_FETCHED) {
    return false;
  }

  return state;
}
