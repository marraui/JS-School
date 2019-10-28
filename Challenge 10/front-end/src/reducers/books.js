import { BOOKS_FETCHED } from '../constants/action-types';

export default function books(state = [], action) {
  if (action.type !== BOOKS_FETCHED) return state;
  return action.payload ? action.payload : state;
}
