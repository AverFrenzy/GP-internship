import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { PartyContextProvider } from './components/contexts/PartyContext';


ReactDOM.render(
  <BrowserRouter>
    <PartyContextProvider>
      <App />
    </PartyContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
