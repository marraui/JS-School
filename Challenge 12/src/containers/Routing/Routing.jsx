import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { tabsPropType } from '../../constants/redux-types';
import NotFound from '../NotFound';
import FormContainer from '../FormContainer';

export default function Routing({ tabs }) {
  const tabsPath = `/:path(${tabs.join('|')})`;
  return (
    <Router>
      <Switch>
        <Route
          path={tabsPath}
          component={FormContainer}
        />
        <Redirect exact from="/" to={`/${tabs[0]}`} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

Routing.propTypes = {
  tabs: tabsPropType,
};

Routing.defaultProps = {
  tabs: [],
};
