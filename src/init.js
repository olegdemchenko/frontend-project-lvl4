// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import filter from 'leo-profanity';

import store from './store/store.js';
import App from './components/App.jsx';
import resources from './locales';
import DictionaryFilterContext from './contexts/DictionaryFilterContext.js';
import '../assets/application.scss';

const currentLang = 'ru';

export default async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: currentLang,
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

  const Filter = ({ children }) => {
    filter.loadDictionary(currentLang);
    return <DictionaryFilterContext.Provider value={{ filter }}>
      {children}
    </DictionaryFilterContext.Provider>
  };

  ReactDOM.render(
    <Provider store={store}>
      <Filter>
        <App />
      </Filter>
    </Provider>,
    document.getElementById('chat').firstElementChild);
};
