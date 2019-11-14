import { createStore } from 'redux';
import getStoredIntervals from '../utils/get-stored-intervals';
import rootReducer from '../reducers/index';

const storedIntervals = getStoredIntervals();
const store = createStore(
  rootReducer,
  {
    intervals: [
      {
        start: 0,
        end: null,
        title: 'Full clip',
        id: 0,
        tags: [],
        saved: true,
      },
      ...storedIntervals,
    ],
  },
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
