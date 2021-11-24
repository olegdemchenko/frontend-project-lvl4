// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store.js';
import App from './components/App.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const normalizeMainPageLayout = () => {
  document.body.classList.add('bg-light');
  document.body.firstElementChild.classList.remove('container-lg', 'p-3');
};

normalizeMainPageLayout();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'));
