import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();  
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  // useEffect(() => {
  //   if(!isAuthenticated) return;
  //   getAccessTokenSilently().then(token => {
  //     console.log("token");        
  //     fetch(`/user/registration`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //     }).then(response => {
  //       console.log(response);
  //       if(response.ok) {
  //         response.json().then(created => console.log(created));          
  //       }
  //     });
  //   });
  // }, [getAccessTokenSilently, isAuthenticated])

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
