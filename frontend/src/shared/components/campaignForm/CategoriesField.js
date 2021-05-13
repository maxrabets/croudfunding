import React, { useCallback, useState } from "react";
import {InputLabel, Select, FormControl, MenuItem, FormHelperText} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    select: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

const CategoriesField = ({onSetCategory, categories, defaultCategory}) => {
    const [category, setCategory] = useState(defaultCategory || "");
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
            >
                {categories.map(category => 
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                )}
            </Select>
            <FormHelperText>{(category === "") ? 
                <FormattedMessage id="validation.required" /> : ""}
            </FormHelperText>
        </FormControl>
    )
}

export default CategoriesField