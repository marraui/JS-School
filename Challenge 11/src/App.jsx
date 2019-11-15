import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { ThemeProvider } from 'styled-components';
import store from './store/index';
import HomePage from './components/HomePage/index';
import theme from './styles/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
