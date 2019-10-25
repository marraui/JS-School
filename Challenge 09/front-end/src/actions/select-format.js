import { SELECT_FORMAT } from '../constants/action-types';

export default function selectFormat(payload) {
  return {
    type: SELECT_FORMAT,
    payload,
  };
}
