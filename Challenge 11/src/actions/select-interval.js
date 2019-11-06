import { SELECT_INTERVAL } from '../constants/action-types';

export default function selectInterval(payload) {
  return {
    type: SELECT_INTERVAL,
    payload,
  };
}
