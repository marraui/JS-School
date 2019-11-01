import { BOOKS_FETCHED, UPDATE_BOOK } from '../constants/action-types';

export default function books(state = [], action) {
  if (action.type !== BOOKS_FETCHED && action.type !== UPDATE_BOOK) return state;
  if (action.type === BOOKS_FETCHED) return action.payload ? action.payload : state;
  return state.map((book) => {
    if (book.id === action.payload.id && book.id) return action.payload;
    return book;
  });
}
