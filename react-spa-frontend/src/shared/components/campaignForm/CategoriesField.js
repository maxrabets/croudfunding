import React from "react";
import {InputLabel, Select, FormControl, Box, MenuItem} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    select: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

const CategoriesField = ({onChange, categories}) => {
    
    const classes = useStyles();
    return(
        <Box m={4}>
            <FormControl>
                <InputLabel id="categories-select-label">
                    <FormattedMessage id="campaigns.category" />
                </InputLabel>
                <Select
                    defaultValue={categories[0] || ""}
                    onChange={onChange}
                    id="categories-select"
                    labelId="categories-select-label"
                    className={classes.select}
                >
                    {categories.map(category => 
                        <MenuItem value={category}>{category}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}

export default CategoriesField