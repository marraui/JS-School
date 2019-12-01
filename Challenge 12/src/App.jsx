import React from 'react';
import { ThemeProvider } from 'styled-components';
import Routing from './containers/Routing';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  );
}

export default App;
