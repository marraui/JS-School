import { ajax } from 'rxjs/ajax';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { LOG_IN, LOG_IN_ERROR } from '../constants/action-types';
import { logInSuccessfully } from '../actions/index';

export default function loginEpic(action$) {
  return action$.pipe(
    ofType(LOG_IN),
    mergeMap((action) => ajax({
      url: 'http://localhost:3001/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: action.payload.email,
        password: action.payload.password,
      },
    }).pipe(
      map((ajaxResponse) => logInSuccessfully(ajaxResponse.response.token)),
      catchError((error) => of({
        type: LOG_IN_ERROR,
        payload: error,
        error: true,
      })),
    )),
  );
}
