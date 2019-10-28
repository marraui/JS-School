import { SELECT_PAGE } from '../constants/action-types';

export default function selectPage(payload) {
  return {
    type: SELECT_PAGE,
    payload,
  };
}
