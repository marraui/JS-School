import { LOG_IN } from '../constants/action-types';

export default function logIn(payload) {
  return {
    type: LOG_IN,
    payload,
  };
}
