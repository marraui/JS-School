import { REMOVE_ATTRIBUTE } from '../constants/action-types';

export default function removeAttribute(payload) {
  return {
    type: REMOVE_ATTRIBUTE,
    payload,
  };
}
