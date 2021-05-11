import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {NavLink} from "react-router-dom";
import {Button, TableContainer, Table, TableHead, Typography,
    TableRow, TableCell, TableBody, Paper, Breadcrumbs} from '@material-ui/core';
import {FormattedMessage} from "react-intl"

const CampaignsMenu = () => {
    const { user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [campaigns, setCampaigns] = useState([]);
    
    console.log(campaigns);
    const getCampaigns = () => {
        if(isAuthenticated) {
            fetch(`/campaigns?userId=${user.sub}`)
            .then( response => {
                if(response.ok){
                    response.json().then(campaigns => {
                        console.log(campaigns);
                        setCampaigns(campaigns);                        
                    });
                }
            })
        }
    }
    useEffect(getCampaigns, [isAuthenticated, user.sub]);

    const onDelete = useCallback(async (id) => {
        if(isAuthenticated) {
            const token = await getAccessTokenSilently();
            fetch(`/campaigns/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log(response);
                if(response.ok) {
                    getCampaigns();
                }
            });
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
                            <TableRow key={campaign.name}>
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
