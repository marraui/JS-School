import { FETCHING_BOOKS } from '../constants/action-types';

export default function fetchingBooks(payload) {
  return {
    type: FETCHING_BOOKS,
    payload,
  };
}
