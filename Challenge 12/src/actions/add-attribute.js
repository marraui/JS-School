import { ADD_ATTRIBUTE } from '../constants/action-types';

export default function addAttribute(payload) {
  return {
    type: ADD_ATTRIBUTE,
    payload,
  };
}
