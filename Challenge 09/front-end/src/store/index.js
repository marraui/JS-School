import { createStore } from 'redux';
import rootReducer from '../reducers/index';

const token = sessionStorage.getItem('token');
const store = createStore(
  rootReducer,
  {
    authentication: token || '',
  },
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
