import { UPDATE_INTERVAL } from '../constants/action-types';

export default function updateInterval(payload) {
  return {
    type: UPDATE_INTERVAL,
    payload,
  };
}
