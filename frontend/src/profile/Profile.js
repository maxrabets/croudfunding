import React, { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {TextField, Button, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl"
import {getUserBonuses as getUserBonusesFromApi} from "../shared/apis/usersApi";
import AvailableBonusesList from "../shared/components/bonuses/AvailableBonusesList";
import authConstants from "../shared/constants/authConstants"

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    const [bonuses, setBonuses] = useState([]);
    //const [user, setUser] = useState(false);
    console.log(user[authConstants.NAMESPACE].roles);

    const isAdmin = user[authConstants.NAMESPACE].roles.includes(authConstants.ADMIN);

    const getUserBonuses = () => {
        if(isAuthenticated) {
            getUserBonusesFromApi(user.sub).then(bonuses => {
                if(bonuses) {
                    setBonuses(bonuses);
                }
            })
        }
    }
    useEffect(getUserBonuses, [isAuthenticated, user.sub]);
        
    if(isAuthenticated) {

        return (
            <Box m={2}>
                <img
                    src={user.picture}
                    alt="Profile"
                />
                <Box my={2}>
                    <NavLink to="profile/campaigns">
                        <Button variant="contained" color="primary">                
                                <FormattedMessage id="links.myCampaigns" />                
                        </Button>
                    </NavLink>
                    {isAdmin ? 
                        <NavLink to="/administration">
                            <Button variant="contained" color="primary">                
                                    <FormattedMessage id="links.administration" />                
                            </Button>
                        </NavLink>
                        : <></>
                    }
                </Box>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField                         
                            id="standard-name" 
                            label={<FormattedMessage id="profile.name" />}
                            value={user.given_name} 
                            disabled
                        />
                    </div>
                    <div>
                        <TextField 
                            id="standard-surname" 
                            label={<FormattedMessage id="profile.surname" />} 
                            value={user.family_name} 
                            disabled                    
                        />
                    </div>
                    <div>
                        <TextField 
                            id="standard-email" 
                            label={<FormattedMessage id="profile.email" />}
                            value={user.email} 
                            disabled
                        />
                    </div>
                </form>
                <AvailableBonusesList bonuses={bonuses} />
            </ Box>
        );
    }
  return <></>
};

export default Profile;
