import { SELECT_CITY } from '../constants/action-types';

export default function selectCity(payload) {
  return {
    type: SELECT_CITY,
    payload,
  };
}
