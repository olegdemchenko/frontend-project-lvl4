// @ts-check
import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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
      fallbackLng: 'en',
    });

  const Filter = ({ children }) => {
    filter.loadDictionary(currentLang);
    return (
      <DictionaryFilterContext.Provider value={{ filter }}>
        {children}
      </DictionaryFilterContext.Provider>
    );
  };

  return (
    <Provider store={store}>
      <Filter>
        <App />
      </Filter>
    </Provider>
  );
};
