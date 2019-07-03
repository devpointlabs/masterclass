import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import "semantic-ui-css/semantic.min.css"
import { initMiddleware, } from 'devise-axios'
import { ThemeProvider, } from 'styled-components';


initMiddleware()

const theme = {
  fg: 'white',
  bg: 'black',
}


ReactDOM.render(

  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root'));



serviceWorker.unregister();
