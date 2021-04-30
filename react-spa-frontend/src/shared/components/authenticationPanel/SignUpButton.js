import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl"

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      <FormattedMessage id="authentication.signup"/>
    </button>
  );
};

export default SignupButton;
