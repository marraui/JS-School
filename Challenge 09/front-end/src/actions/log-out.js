import { LOG_OUT } from '../constants/action-types';

export default function logOut() {
  return {
    type: LOG_OUT,
    payload: '',
  };
}
