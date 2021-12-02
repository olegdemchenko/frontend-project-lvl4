// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import store from './store/store.js';
import App from './components/App.jsx';
import resources from './locales';
import '../assets/application.scss';

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "ru",
      fallbackLng: "en",
    });
  
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const normalizeMainPageLayout = () => {
    document.body.classList.add('bg-light');
    document.body.firstElementChild.classList.remove('container-lg', 'p-3');
    const chatContainer = document.getElementById('chat');
    const appContainer = document.createElement('div');
    appContainer.classList.add('d-flex', 'flex-column', 'h-100');
    chatContainer.append(appContainer);
  };

  normalizeMainPageLayout();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat').firstElementChild);

};
