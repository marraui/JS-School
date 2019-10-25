import React from 'react';
import {
  Route,
  Switch, Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../login/Login';
import App from '../app/App';
import NotFound from '../notfound/NotFound';
import store from '../../store/index';

export default function Routing() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Provider>
  );
}
