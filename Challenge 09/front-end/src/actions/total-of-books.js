import { TOTAL_OF_BOOKS } from '../constants/action-types';

export default function totalOfBooks(payload) {
  return {
    type: TOTAL_OF_BOOKS,
    payload,
  };
}
