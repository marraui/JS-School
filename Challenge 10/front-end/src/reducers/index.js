import { combineReducers } from 'redux';
import search from './search';
import city from './city';
import format from './format';
import page from './page';
import authentication from './authentication';
import books from './books';
import fetchingBooks from './fetching-books';
import resPerPage from './res-per-page';
import totalOfBooks from './total-of-books';

const rootReducer = combineReducers({
  search,
  city,
  format,
  page,
  authentication,
  fetchingBooks,
  books,
  resPerPage,
  totalOfBooks,
});
export default rootReducer;
