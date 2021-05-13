import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl"
import Button from '@material-ui/core/Button';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      <FormattedMessage id="authentication.signup"/>
    </Button>
  );
};

export default SignupButton;
