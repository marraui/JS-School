import { combineReducers } from 'redux';
import authentication from './authentication';
import books from './books';
import fetchingBooks from './fetching-books';
import resPerPage from './res-per-page';
import totalOfBooks from './total-of-books';

const rootReducer = combineReducers({
  authentication,
  fetchingBooks,
  books,
  resPerPage,
  totalOfBooks,
});
export default rootReducer;
