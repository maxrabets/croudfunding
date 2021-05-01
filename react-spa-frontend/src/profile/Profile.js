import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TextField from '@material-ui/core/TextField';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();  

if(isAuthenticated) {
    const { given_name, family_name, picture, email } = user;
    return (
        <>
            <img
                src={picture}
                alt="Profile"
            />
            <form  noValidate autoComplete="off">
                <div>
                    <TextField id="standard-name" label="Name" value={given_name} />
                </div>
                <div>
                    <TextField id="standard-name" label="Surname" value={family_name} />
                </div>
                <div>                    
                    <TextField id="standard-name" label="Email" value={email} />
                </div>                
            </form>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </>
    );
  }
  return <></>
};

export default Profile;
