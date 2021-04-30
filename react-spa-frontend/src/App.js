import React from 'react';
import AppRouter from './common/AppRouter';
import {IntlProvider} from 'react-intl';

function App() {
  return (
    <div className="App">
      <IntlProvider locale={userLocale} messages={messages}>
        <AppRouter/>
      </IntlProvider>      
    </div>
  );
}

export default App;
