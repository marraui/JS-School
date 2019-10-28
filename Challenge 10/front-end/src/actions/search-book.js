import { SEARCH_BOOK } from '../constants/action-types';

export default function searchBook(payload) {
  return {
    type: SEARCH_BOOK,
    payload,
  };
}
