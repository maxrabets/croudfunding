import React from "react";
import {NavLink} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {TextField, Button} from '@material-ui/core';
import {FormattedMessage} from "react-intl"

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
                <NavLink to="profile/campaigns">
                    <Button variant="contained" color="primary">                
                            <FormattedMessage id="links.myCampaigns" />                
                    </Button>
                </NavLink>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField 
                            id="standard-name" 
                            label={<FormattedMessage id="profile.name" />}
                            value={given_name} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="standard-surname" 
                            label={<FormattedMessage id="profile.surname" />} 
                            value={family_name}                     
                        />
                    </div>
                    <div>                    
                        <TextField 
                            id="standard-email" 
                            label={<FormattedMessage id="profile.email" />}
                            value={email} 
                        />
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
