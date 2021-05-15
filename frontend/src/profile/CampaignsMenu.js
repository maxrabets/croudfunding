import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {NavLink} from "react-router-dom";
import {Button, Typography, Box, Breadcrumbs} from '@material-ui/core';
import {FormattedMessage} from "react-intl"
import {getUserCampaigns, deleteCampaign} from "../shared/apis/campaignsApi"
import CampaignsManagmentTable from "../shared/components/campaigns/CampaignsManagmentTable"

const CampaignsMenu = () => {
    const { user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [campaigns, setCampaigns] = useState([]);
    
    const getCampaigns = useCallback(() => {
        if(isAuthenticated) {
            getUserCampaigns(user.sub).then(campaigns => {
                if(campaigns)
                    setCampaigns(campaigns);
                else
                    console.log("error")
            })
        }
    }, [isAuthenticated, user.sub])
    useEffect(getCampaigns, [getCampaigns]);

    const onDelete = useCallback(async (id) => {
        if(isAuthenticated) {
            const token = await getAccessTokenSilently();
            deleteCampaign(id, token).then(deleted => {
                if(deleted)
                    getCampaigns();
                else
                    console.log("delete error")
            })
        }
    }, [getAccessTokenSilently, getCampaigns, isAuthenticated]);

    if(isAuthenticated) {
        return (
            <Box m={2}>
                <Box my={2}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <NavLink color="inherit" to="/profile" >
                            <FormattedMessage id="links.profile" />
                        </NavLink>
                        <Typography color="textPrimary">
                            <FormattedMessage id="links.myCampaigns" />
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Box my={2}>
                    <NavLink to="campaigns/create">
                        <Button variant="contained" color="primary">                        
                            <FormattedMessage id="campaigns.create" />                        
                        </Button>
                    </NavLink>
                </Box>
                <Box my={2}>
                    <CampaignsManagmentTable campaigns={campaigns} onDelete={onDelete}/>
                </Box>
            </ Box>
        );
    }
    return <></>
};

export default CampaignsMenu;
