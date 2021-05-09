import React, { useCallback, useState } from "react";
import {TextField, TableContainer, Table,
    TableHead, TableRow, TableCell, TableBody, Paper, Button} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import MoneyField from "./MoneyField";
import RequiredTextField from "./RequiredTextField";

const BonusesField = ({defaultBonus, defaultBonuses, onChange}) => {
    const [bonuses, setBonuses] = useState(defaultBonuses);
    const [bonusName, setBonusName] = useState(defaultBonus.name);
    const [bonusDescription, setBonusDescription] = useState(defaultBonus.description);
    const [bonusPrice, setBonusPrice] = useState("");

    const onAdd = useCallback(() => {
        const newBonus = { name: bonusName, description: bonusDescription, price: bonusPrice}
        const newBonuses = bonuses.concat(newBonus);
        setBonuses(newBonuses);
        console.log(newBonuses);
        onChange(newBonuses);
    }, [bonusDescription, bonusName, bonusPrice, bonuses, onChange]);

    const onRemove = useCallback((bonus) => {
        const index = bonuses.indexOf(bonus);
        const bonusesCopy = bonuses.slice();
        bonusesCopy.splice(index, 1);
        setBonuses(bonusesCopy);
        onChange(bonusesCopy);
    }, [bonuses, onChange]);

    return(
        <>
            
            <RequiredTextField onSetName={(name) => setBonusName(name)} 
                defaultName={defaultBonus.name}
                label={<FormattedMessage id="campaigns.bonuses.name" />}
            />
            <TextField
                defaultValue={defaultBonus.description}
                value={bonusDescription}
                onChange={(e) => setBonusDescription(e.target.value)}
                label={<FormattedMessage id="campaigns.bonuses.description" />}
            />
            <MoneyField onSetMoney={(bonusPrice) => setBonusPrice(bonusPrice)}
                defaultMoney={defaultBonus.price}                
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
        </>
    )
}

export default BonusesField;