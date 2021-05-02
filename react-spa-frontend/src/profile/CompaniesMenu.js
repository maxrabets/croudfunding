import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Paper} from '@material-ui/core';
import {FormattedMessage} from "react-intl"

const CompaniesMenu = () => {
    const { isAuthenticated } = useAuth0();  

    if(isAuthenticated) {
        return (
            <>
                <Button variant="contained" 
                    color="primary" 
                    href="profile/companies/create"
                >
                    <FormattedMessage id="companies.create" />
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
