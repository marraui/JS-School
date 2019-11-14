import { REMOVE_INTERVAL } from '../constants/action-types';

export default function removeInterval(payload) {
  return {
    type: REMOVE_INTERVAL,
    payload,
  };
}
