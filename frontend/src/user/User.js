import React, {useState, useEffect} from "react";
import {FormattedMessage, FormattedDate} from "react-intl";
import { Typography, Box, CircularProgress, TextField } from '@material-ui/core';
import "@yaireo/tagify/dist/tagify.css";
import {getUserBonuses as getUserBonusesFromApi} from "../shared/apis/usersApi";
import {getUser as getUserFromApi} from "../shared/apis/usersApi";
import {getUserCampaigns} from "../shared/apis/campaignsApi"
import AvailableBonusesList from "../shared/components/bonuses/AvailableBonusesList";
import CampaignPreviewCard from "../shared/components/campaigns/CampaignPreviewCard";

const Campaign = (props) => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [bonuses, setBonuses] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    
    const getCampaigns = () => {
        getUserCampaigns(props.match.params.id).then(campaigns => {
            if(campaigns)
                setCampaigns(campaigns);
            else
                console.log("error")
        })
    }
    useEffect(getCampaigns, [getCampaigns]);

    const getUserBonuses = () => {
        getUserBonusesFromApi(props.match.params.id).then(bonuses => {
            if(bonuses) {
                setBonuses(bonuses);
            }
        })
    }
    useEffect(getUserBonuses, [props.match.params.id]);

    const getUser = () => {
        getUserFromApi(props.match.params.id).then(user => { 
            if(user){                    
                setUser(user);          
                setIsLoaded(true);
            }
            else
                console.log('error')
        })
    }
    useEffect(getUser, [props.match.params.id, setIsLoaded]);


    if(!isLoaded)
        return <CircularProgress />;
    
    return (
        <Box m={2}>
            <img
                src={user.picture}
                alt="Profile"
            />
            <Typography align="right" fontStyle="italic">
                <FormattedMessage id="campaigns.comments.creationDate" />: 
                <FormattedDate value={user.last_login} />
            </Typography>
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
                        label={<FormattedMessage id="profile.nickname" />}
                        value={user.nickname} 
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
            <Typography>
                <FormattedMessage id="campaigns.bonuses" />
            </Typography>
            <AvailableBonusesList bonuses={bonuses} />
            <Typography>
                <FormattedMessage id="campaigns" />
            </Typography>
            {campaigns.map(campaign => 
                <CampaignPreviewCard key={campaign.id} campaign={campaign}/>
            )}
        </ Box>
    );
};

export default Campaign;
