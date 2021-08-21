import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppStore} from './store'
ReactDOM.render(
  <AppStore>
      <App />
  </AppStore>
,
  document.getElementById('root')
);


