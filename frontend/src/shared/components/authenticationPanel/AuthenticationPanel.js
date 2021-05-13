import React from "react";
import SignupButton from "./SignUpButton"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthenticaionPanel(){
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? <LogoutButton /> : <><LoginButton /><SignupButton /></>;
}