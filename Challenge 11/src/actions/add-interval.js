import { ADD_INTERVAL } from '../constants/action-types';

export default function addInterval(payload) {
  return {
    type: ADD_INTERVAL,
    payload,
  };
}
