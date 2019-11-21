import { UPDATE_ATTRIBUTE } from '../constants/action_types';

export default function updateAttribute(payload) {
  return {
    type: UPDATE_ATTRIBUTE,
    payload,
  };
}
