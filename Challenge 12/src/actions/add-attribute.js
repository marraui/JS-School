import { ADD_ATTRIBUTE } from '../constants/action-types';
import defaultAttribute from '../constants/default-attribute';

export default function addAttribute(payload) {
  return {
    type: ADD_ATTRIBUTE,
    payload: { ...defaultAttribute, ...payload, id: new Date().getTime() },
  };
}
