import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Breadcrumbs } from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
import CampaignForm from "../shared/components/campaignForm/CampaignForm"

const CampaignsCreateMenu = () => {
    const { isAuthenticated } = useAuth0();
    
    

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

            <CampaignForm />
        </>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
