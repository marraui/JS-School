import { UPDATE_SEARCH_VALUE } from '../constants/action-types';

export default function searchValue(state = '', action) {
  if (action.type !== UPDATE_SEARCH_VALUE) return state;
  return action.payload;
}
