import {
  ADD_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
} from '../constants/action-types';

export default function attributes(state = [], { type, payload }) {
  if (type === ADD_ATTRIBUTE) return [...state, payload];
  if (type === REMOVE_ATTRIBUTE) return state.filter((attribute) => attribute.id !== payload);
  if (type === UPDATE_ATTRIBUTE) {
    return state.map((attribute) => (attribute.id === payload.id && payload) || attribute);
  }
  return state;
}
