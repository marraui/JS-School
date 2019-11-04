import { LOG_IN_SUCCESSFULLY } from '../constants/action-types';

export default function logInSuccessfully(payload) {
  return {
    type: LOG_IN_SUCCESSFULLY,
    payload,
  };
}
