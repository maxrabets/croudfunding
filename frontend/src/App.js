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
import ProtectedRoute from './authentication/ProtectedRoute'
import Profile from './profile/Profile'
import CampaignsMenu from './profile/CampaignsMenu'
import NewsMenu from './profile/NewsMenu'
import CampaignsCreateMenu from './profile/CampaignsCreateMenu'
import CampaignsUpdateMenu from './profile/CampaignsUpdateMenu'
import Campaign from './campaign/Campaign'
import Footer from './common/Footer';

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
}

function App() {
  const selectedLocale = useSelector(selectLocale);
  const theme = useSelector(selectTheme);

  return (
      <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <ThemeProvider theme={createMuiTheme(theme)}>
          <Paper style={{minHeight: "100vh"}} square elevation={0}>
            <NavigationPanel/>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/campaigns/:id" component={Campaign} />
              <ProtectedRoute exact path="/profile/campaigns/create" 
                component={CampaignsCreateMenu} />
              <ProtectedRoute path="/profile/campaigns/:id/news"
                component={NewsMenu} />        
              <ProtectedRoute path="/profile/campaigns/:id"
                component={CampaignsUpdateMenu} />
              <ProtectedRoute path="/profile/campaigns" component={CampaignsMenu} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/administration" component={() => { 
                  window.location.href = 'https://crowdfunding.eu12.webtask.io/auth0-delegated-admin'; 
                  return null;
                }} 
              />
              <Route path="/" component={Main} />
            </Switch>
            <Footer />
          </Paper> 
        </ThemeProvider>
      </IntlProvider>
  );
}

export default App;
