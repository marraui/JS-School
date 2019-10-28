import { LOG_IN, LOG_OUT } from '../constants/action-types';

export default function authentication(state = '', action) {
  if (action.type === LOG_OUT) return '';
  if (action.type !== LOG_IN) return state;
  return action.payload ? action.payload : state;
}
