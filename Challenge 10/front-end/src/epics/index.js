import { combineEpics } from 'redux-observable';
import logInEpic from './login-epic';
import fetchBooksEpic from './fetch-books-epic';

const rootEpic = combineEpics(
  logInEpic,
  fetchBooksEpic,
);

export default rootEpic;
