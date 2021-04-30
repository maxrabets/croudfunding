import React, { useState } from 'react';
import AppRouter from './common/AppRouter';
import {IntlProvider} from 'react-intl';
import locales from "./shared/locales/locales";
import enMessages from "./shared/locales/enMessages.json";
import ruMessages from "./shared/locales/ruMessages.json";

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
}

function App() {
  const [selectedLocale, setSelectedLocale] = useState(locales.EN);

  return (
    <div className="App">
      <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <AppRouter/>
      </IntlProvider>      
    </div>
  );
}

export default App;
