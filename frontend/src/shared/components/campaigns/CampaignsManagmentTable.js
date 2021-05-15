import React  from "react";
import {NavLink} from "react-router-dom";
import {Button, TableContainer, Table, TableHead, 
    TableRow, TableCell, TableBody, Paper, } from '@material-ui/core';
import {FormattedMessage, FormattedDate} from "react-intl"

const CampaignsMenu = ({campaigns, onDelete}) => {

    
    return (
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
                            <FormattedMessage id="campaigns.status" />
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
                        <TableCell><FormattedDate value={campaign.endDate}/></TableCell>
                        <TableCell>{campaign.status}</TableCell>
                        <TableCell>
                            { campaign.status === "active" ?
                            <NavLink to={`campaigns/${campaign.id}`}>
                                <Button variant="contained" 
                                    color="primary" disabled={campaign.status !== "active" }
                                >                        
                                    <FormattedMessage id="campaigns.update" />                        
                                </Button>                                    
                            </NavLink> : <></>
                            }
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
    );
}

export default CampaignsMenu;
