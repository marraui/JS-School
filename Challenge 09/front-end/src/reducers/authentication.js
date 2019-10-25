import { LOG_IN } from '../constants/action-types';

export default function authentication(state = '', action) {
  if (action.type !== LOG_IN) return state;
  return action.payload ? action.payload : state;
}
