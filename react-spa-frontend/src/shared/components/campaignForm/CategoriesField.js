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

const CategoriesField = ({onChange}) => {
    
    const classes = useStyles();
    return(
        <Box m={4}>
            <FormControl>
                <InputLabel id="categories-select-label">
                    <FormattedMessage id="campaigns.category" />
                </InputLabel>
                <Select
                    onChange={onChange}
                    id="categories-select"
                    labelId="categories-select-label"
                    className={classes.select}
                >
                    <MenuItem value={10}>Electronics</MenuItem>
                    <MenuItem value={20}>Cars</MenuItem>
                    <MenuItem value={30}>Education</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default CategoriesField