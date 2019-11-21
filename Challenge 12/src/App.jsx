import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import Routing from './containers/Routing';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{}}>
        <Routing />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
