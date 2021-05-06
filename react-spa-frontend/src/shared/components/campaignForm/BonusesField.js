import React, { useCallback, useState } from "react";
import {TextField, Box, TableContainer, Table,
    TableHead, TableRow, TableCell, TableBody, Paper, Button} from '@material-ui/core';
import {FormattedMessage} from "react-intl";

const BonusesField = ({onChange}) => {
    const [bonuses, setBonuses] = useState([]);
    const [bonusName, setBonusName] = useState("");
    const [bonusDescription, setBonusDescription] = useState("");
    const [bonusPrice, setBonusPrice] = useState("");

    const onAdd = useCallback(() => {
        const newBonus = { name: bonusName, description: bonusDescription, price: bonusPrice}
        setBonuses(bonuses.concat(newBonus));
        onChange(bonuses.splice());
    }, [bonusDescription, bonusName, bonusPrice, bonuses, onChange]);

    const onRemove = useCallback((bonus) => {
        const index = bonuses.indexOf(bonus);
        const bonusesCopy = bonuses.slice();
        bonusesCopy.splice(index, 1);
        setBonuses(bonusesCopy);
        onChange(bonuses.splice());
    }, [bonuses, onChange]);

    return(
        <Box m={4}>
            <TextField
                value={bonusName}
                onChange={(e) => setBonusName(e.target.value)}
                label={<FormattedMessage id="campaigns.bonuses.name" />}
            />
            <TextField
                value={bonusDescription}
                onChange={(e) => setBonusDescription(e.target.value)}
                label={<FormattedMessage id="campaigns.bonuses.description" />}
            />
            <TextField
                value={bonusPrice}
                onChange={(e) => setBonusPrice(e.target.value)}
                label={<FormattedMessage id="campaigns.bonuses.price" />}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={onAdd}
            >
                <FormattedMessage id="campaigns.bonuses.add" />
            </Button>
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
                                    <FormattedMessage id="campaigns.bonuses.remove" />
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
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => onRemove(bonus)}
                                        >
                                            <FormattedMessage id="campaigns.bonuses.remove" />
                                        </Button>
                                    </TableCell>
                              </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Box>
    )
}

export default BonusesField