import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl"
import Button from '@material-ui/core/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      <FormattedMessage id="authentication.logout"/>
    </Button>
  );
};

export default LogoutButton;
