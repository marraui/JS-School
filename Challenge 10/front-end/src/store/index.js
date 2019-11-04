import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers/index';
import rootEpic from '../epics/index';

const token = sessionStorage.getItem('token');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  {
    authentication: token || '',
  },
  // eslint-disable-next-line no-underscore-dangle
  composeEnhancers(
    applyMiddleware(epicMiddleware),
  ),
);

epicMiddleware.run(rootEpic);
export default store;
