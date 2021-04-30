import React, { useState } from 'react';
import AppRouter from './common/AppRouter';
import {IntlProvider} from 'react-intl';
import locales from "./shared/locales/locales";
import enMessages from "./shared/locales/enMessages.json";
import ruMessages from "./shared/locales/ruMessages.json";
import LanguagePicker from './common/LanguagePicker';
import localStorageKeys from './shared/constants/localStorageKeys';

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
}

function App() {
  const [selectedLocale, setSelectedLocale] = 
  useState(localStorage.getItem(localStorageKeys.LOCALE) || locales.EN);
  console.log(selectedLocale);
  return (
    <div className="App">
      <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <LanguagePicker selectedLocale={selectedLocale}
         setSelectedLocale={setSelectedLocale} />
        <AppRouter/>
      </IntlProvider>      
    </div>
  );
}

export default App;
