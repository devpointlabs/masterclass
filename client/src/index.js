import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'; 
import {SearchProvider} from './providers/SearchProvider'; 
import "semantic-ui-css/semantic.min.css"
import "video-react/dist/video-react.css"
import { initMiddleware, } from 'devise-axios'
import { ThemeProvider, } from 'styled-components';
import 'react-accessible-accordion/dist/fancy-example.css';


initMiddleware()

const theme = {
  bg: 'black',
  fg: 'white',
}


ReactDOM.render(

  <AuthProvider>
    <SearchProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </SearchProvider>
  </AuthProvider>,
  document.getElementById('root'));



serviceWorker.unregister();



