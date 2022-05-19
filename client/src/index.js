import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './utils/store';
import {Provider} from "react-redux";
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

