import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {NavLink} from "react-router-dom";
import {Button, TableContainer, Table, TableHead, Typography,
    TableRow, TableCell, TableBody, Paper, Breadcrumbs} from '@material-ui/core';
import {FormattedMessage} from "react-intl"
import {getUserCampaigns, deleteCampaign} from "../shared/apis/campaignsApi"

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
            <>
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink color="inherit" to="/profile" >
                        <FormattedMessage id="links.profile" />
                    </NavLink>
                    <Typography color="textPrimary">
                        <FormattedMessage id="links.myCampaigns" />
                    </Typography>
                </Breadcrumbs>
                <NavLink to="campaigns/create">
                    <Button variant="contained" color="primary">                        
                        <FormattedMessage id="campaigns.create" />                        
                    </Button>
                </NavLink>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <FormattedMessage id="campaigns.name" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="campaigns.category" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="campaigns.money.summary" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="campaigns.endDate" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="campaigns.update" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="campaigns.delete" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {campaigns.map(campaign => 
                            <TableRow key={campaign.id}>
                                <TableCell>{campaign.name}</TableCell>
                                <TableCell>{campaign.category.name}</TableCell>
                                <TableCell>{
                                    `${campaign.currentMoney}/${campaign.targetMoney}`
                                    }
                                </TableCell>
                                <TableCell>{new Date(campaign.endDate)
                                    .toDateString()}</TableCell>
                                <TableCell>
                                    <NavLink to={`campaigns/${campaign.id}`}>
                                        <Button variant="contained" color="primary">                        
                                            <FormattedMessage id="campaigns.update" />                        
                                        </Button>                                    
                                    </NavLink>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary"
                                        onClick={() => onDelete(campaign.id)}>                        
                                        <FormattedMessage id="campaigns.delete" />                        
                                    </Button>
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
    return <></>
};

export default CampaignsMenu;
