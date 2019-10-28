import { UNSELECT_FORMAT } from '../constants/action-types';

export default function unselectFormat(payload) {
  return {
    type: UNSELECT_FORMAT,
    payload,
  };
}
