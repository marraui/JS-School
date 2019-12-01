import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
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
  tabs: PropTypes.arrayOf(PropTypes.string),
};

Routing.defaultProps = {
  tabs: ['Device', 'Sensors', 'Settings', 'Commands', 'Metadata'],
};
