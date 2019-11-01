import React from 'react';
import {
  Route,
  Switch, Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';
import Login from '../login/Login';
import App from '../app/App';
import NotFound from '../notfound/NotFound';
import store from '../../store/index';
import theme from '../../styles/theme';

export default function Routing() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/login" component={Login} />
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </ToastProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}
