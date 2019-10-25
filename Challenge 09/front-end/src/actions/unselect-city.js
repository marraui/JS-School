import { UNSELECT_CITY } from '../constants/action-types';

export default function unselectCity(payload) {
  return {
    type: UNSELECT_CITY,
    payload,
  };
}
