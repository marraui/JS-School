import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';
import MainDisplay from '../MainDisplay';
import SaveOptions from '../SaveOptions';
import NotFound from '../NotFound';

export default function Routing({ tabs }) {
  const tabsPath = `/:path(${tabs.join('|')})`;
  return (
    <Router>
      <Switch>
        <Route
          path={tabsPath}
          render={() => (
            <>
              <Navbar />
              <MainDisplay />
              <SaveOptions />
            </>
          )}
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
  tabs: [],
};
