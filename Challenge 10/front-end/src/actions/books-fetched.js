import { BOOKS_FETCHED } from '../constants/action-types';

export default function booksFetched(payload) {
  return {
    type: BOOKS_FETCHED,
    payload,
  };
}
