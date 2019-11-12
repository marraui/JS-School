import { UPDATE_SEARCH_VALUE } from '../constants/action-types';

export default function updateSearchValue(payload) {
  return {
    type: UPDATE_SEARCH_VALUE,
    payload,
  };
}
