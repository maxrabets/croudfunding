import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {NavLink} from "react-router-dom";
import {Button, TableContainer, Table, TableHead, Typography,
    TableRow, TableCell, TableBody, Paper, Breadcrumbs} from '@material-ui/core';
import {FormattedMessage} from "react-intl"

const CompaniesMenu = () => {
    const { isAuthenticated } = useAuth0();  

    if(isAuthenticated) {
        return (
            <>
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink color="inherit" to="/profile" >
                        <FormattedMessage id="links.profile" />
                    </NavLink>
                    <Typography color="textPrimary">
                        <FormattedMessage id="links.mycompanies" />
                    </Typography>
                </Breadcrumbs>
                <Button variant="contained" 
                    color="primary"
                >
                    <NavLink to="companies/create">
                        <FormattedMessage id="companies.create" />
                    </NavLink>
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <FormattedMessage id="companies.name" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="companies.category" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="companies.delete" />
                                </TableCell>
                                <TableCell>
                                    <FormattedMessage id="companies.update" />
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

export default CompaniesMenu;
