import { ajax } from 'rxjs/ajax';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { FETCHING_BOOKS, BOOKS_FETCHED_ERROR } from '../constants/action-types';
import { booksFetched, resPerPage, totalOfBooks } from '../actions/index';

export default function fetchBooksEpic(action$) {
  return action$.pipe(
    ofType(FETCHING_BOOKS),
    mergeMap((action) => ajax.getJSON(`http://localhost:3001/api/book?${action.payload.params}`, {
      Authorization: `JWT ${action.payload.token}`,
    })
      .pipe(
        mergeMap((response) => of(
          booksFetched(response.books),
          resPerPage(response.resPerPage),
          totalOfBooks(response.totalResults),
        )),
        catchError((error) => of({
          type: BOOKS_FETCHED_ERROR,
          payload: error,
          error: true,
        })),
      )),
  );
}
