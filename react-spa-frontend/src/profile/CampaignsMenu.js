import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {NavLink} from "react-router-dom";
import {Button, TableContainer, Table, TableHead, Typography,
    TableRow, TableCell, TableBody, Paper, Breadcrumbs} from '@material-ui/core';
import {FormattedMessage} from "react-intl"

const CampaignsMenu = () => {
    const { isAuthenticated } = useAuth0();  

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
                                    <FormattedMessage id="campaigns.delete" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="campaigns.update" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
    return <></>
};

export default CampaignsMenu;
