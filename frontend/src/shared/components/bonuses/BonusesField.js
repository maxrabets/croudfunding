import React, { useCallback, useState } from "react";
import {TextField, TableContainer, Table, Box,
    TableHead, TableRow, TableCell, TableBody, Paper, Button} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import validateBonus from "../../validators/BonusValidator";

const BonusesField = ({defaultBonus, defaultBonuses, onChange}) => {
    const [bonuses, setBonuses] = useState(defaultBonuses);
    const [bonusName, setBonusName] = useState(defaultBonus.name || "");
    const [bonusDescription, setBonusDescription] = useState(defaultBonus.description || "");
    const [bonusPrice, setBonusPrice] = useState(defaultBonus.price || "");

    const onAdd = useCallback(() => {
        const newBonus = { name: bonusName, description: bonusDescription, price: Number(bonusPrice)}
        if(validateBonus(newBonus) && !bonuses.find(bonus => bonus.name === newBonus.name)) {            
            const newBonuses = bonuses.concat(newBonus);
            setBonuses(newBonuses);
            console.log(newBonuses);
            onChange(newBonuses);
        }
    }, [bonusDescription, bonusName, bonusPrice, bonuses, onChange]);

    const onRemove = useCallback((bonus) => {
        const index = bonuses.indexOf(bonus);
        const bonusesCopy = bonuses.slice();
        bonusesCopy.splice(index, 1);
        setBonuses(bonusesCopy);
        onChange(bonusesCopy);
    }, [bonuses, onChange]);

    return(
        <Box>
            <FormattedMessage id="campaigns.bonuses" />            
            <TextField
                required
                value={bonusName}
                onChange={(e) => setBonusName(e.target.value)}
                label={<FormattedMessage id="campaigns.bonuses.name" />}
                helperText={(bonusName === "") ? 
                    <FormattedMessage id="validation.required" /> : ""}
                error={bonusName === ""}
            />
            <TextField
                value={bonusDescription}
                onChange={(e) => setBonusDescription(e.target.value)}
                label={<FormattedMessage id="campaigns.bonuses.description" />}
            />
            <TextField
                inputProps={{min: "0"}}
                error={bonusPrice === ""}
                value={bonusPrice}
                required
                onChange={(e) => setBonusPrice(e.target.value)}
                type="number"
                label={<FormattedMessage id="campaigns.bonuses.price" />}
                helperText={(bonusPrice === "") ? 
                    <FormattedMessage id="validation.required" /> : ""}
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

export default BonusesField;