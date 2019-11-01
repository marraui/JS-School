import { UPDATE_BOOK } from '../constants/action-types';

export default function updateBook(payload) {
  return {
    type: UPDATE_BOOK,
    payload,
  };
}
