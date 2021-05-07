import React, {useCallback, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Breadcrumbs } from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {NavLink, Redirect} from "react-router-dom";
import CampaignForm from "../shared/components/campaignForm/CampaignForm"

const CampaignsCreateMenu = () => {
    const { isAuthenticated } = useAuth0();        
    const { getAccessTokenSilently } = useAuth0();    
    const [isCreated, setIsCreated] = useState(false);
    
    const onCreate = useCallback(async (formData) => {
        const token = await getAccessTokenSilently();
        fetch(`/profile/campaigns/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }).then(response => {
            console.log(response);
            if(response.ok) {
                setIsCreated(true);
            }
        });
    }, [getAccessTokenSilently]);

    if(isCreated)
        return <Redirect to="/profile/campaigns" ></Redirect>

    if(isAuthenticated) {
        return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <NavLink color="inherit" to="/profile" >
                    <FormattedMessage id="links.profile" />
                </NavLink>
                <NavLink color="inherit" to="/profile/campaigns">
                    <FormattedMessage id="links.myCampaigns" />
                </NavLink>
                <Typography color="textPrimary">
                    <FormattedMessage id="links.createCampaign" />
                </Typography>
            </Breadcrumbs>

            <CampaignForm onSave={onCreate}/>
        </>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
