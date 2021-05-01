import React from 'react';
import { Switch, Route} from "react-router-dom"
import {IntlProvider} from 'react-intl';
import locales from "./shared/locales/locales";
import enMessages from "./shared/locales/enMessages.json";
import ruMessages from "./shared/locales/ruMessages.json";
import NavigationPanel from "./common/NavigationPanel"
import Main from "./main/Main"
import About from "./about/About"
import {ThemeProvider} from "@material-ui/core/styles"
import { Paper} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectLocale } from './shared/slices/selectedLocaleSlice';
import {
  selectTheme
} from './shared/slices/themeSlice';
import { createMuiTheme } from '@material-ui/core/styles';

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
}

function App() {
  const selectedLocale = useSelector(selectLocale);
  const theme = useSelector(selectTheme);

  return (
    <div className="App">
      <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <ThemeProvider theme={createMuiTheme(theme)}>
          <Paper styles={{height: "100vh"}}>
            <NavigationPanel/>
            <Switch>
              <Route path="/about">
                <About></About>
              </Route>
              <Route path="/">
                <Main/>
              </Route>
            </Switch>
          </Paper> 
        </ThemeProvider>
      </IntlProvider>
    </div>
  );
}

export default App;
