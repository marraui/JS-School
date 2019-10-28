import { RES_PER_PAGE } from '../constants/action-types';

export default function resPerPage(payload) {
  return {
    type: RES_PER_PAGE,
    payload,
  };
}
