import React from "react";
import { TableContainer, Table,
    TableHead, TableRow, TableCell, TableBody, Paper, Button} from '@material-ui/core';
import {FormattedMessage} from "react-intl";

const BonusesList = ({bonuses, onPay, disabled}) => {

    return(
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <FormattedMessage id="campaigns.bonuses.name" />
                    </TableCell>
                    <TableCell>
                        <FormattedMessage id="campaigns.bonuses.description" />
                    </TableCell>
                    <TableCell>
                        <FormattedMessage id="campaigns.bonuses.price" />
                    </TableCell>
                    <TableCell>
                        <FormattedMessage id="campaigns.bonuses.pay" />
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {bonuses.map(bonus => 
                    <TableRow key={bonus.name}>
                        <TableCell >{bonus.name}</TableCell>
                        <TableCell >{bonus.description}</TableCell>
                        <TableCell >{bonus.price}</TableCell>
                        <TableCell >
                            <Button disabled={disabled}
                                variant="contained" 
                                color="primary" 
                                onClick={() => onPay(bonus)}
                            >
                                <FormattedMessage id="campaigns.bonuses.pay" />
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>
    );
}

export default BonusesList;