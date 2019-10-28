import { TOTAL_OF_BOOKS } from '../constants/action-types';

export default function totalOfBooks(state = 0, action) {
  if (action.type === TOTAL_OF_BOOKS) {
    return action.payload ? action.payload : state;
  }
  return state;
}
