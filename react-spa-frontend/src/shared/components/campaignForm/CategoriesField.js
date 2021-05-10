import React, { useCallback, useState } from "react";
import {InputLabel, Select, FormControl, MenuItem} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    select: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

const CategoriesField = ({onSetCategory, categories}) => {
    const [category, setCategory] = useState(categories[0] || "");
    const onChange = useCallback((e) => {
        setCategory(e.target.value);
        onSetCategory(e.target.value)
    }, [onSetCategory]);

    const classes = useStyles();
    return(
        <FormControl>
            <InputLabel id="categories-select-label">
                <FormattedMessage id="campaigns.category" />
            </InputLabel>
            <Select
                error={category === ""}
                required
                value={category}
                onChange={onChange}
                id="categories-select"
                labelId="categories-select-label"
                className={classes.select}                
                helperText={(category === "") ? 
                    <FormattedMessage id="validation.required" /> : ""}
            >
                {categories.map(category => 
                    <MenuItem value={category}>{category}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default CategoriesField