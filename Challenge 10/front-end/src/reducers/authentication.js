import Swal from 'sweetalert2';
import { LOG_IN_SUCCESSFULLY, LOG_OUT, LOG_IN_ERROR } from '../constants/action-types';

export default function authentication(state = '', action) {
  if (action.type === LOG_OUT) return '';
  if (action.type === LOG_IN_ERROR) {
    const message = action.payload.status !== 204 ? action.payload.response.message : 'No content';
    Swal.fire('Error', `Error logging in, error: ${message}`, 'error');
  }
  if (action.type !== LOG_IN_SUCCESSFULLY) return state;

  if (!action.payload) {
    Swal.fire('Error', 'Unable to log in', 'error');
    return state;
  }
  sessionStorage.setItem('token', action.payload);
  return action.payload;
}
