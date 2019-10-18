import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch, Redirect,
} from 'react-router-dom';
import Login from '../login/Login';
import App from '../app/App';
import NotFound from '../notfound/NotFound';

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
