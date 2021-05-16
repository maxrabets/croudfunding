import React, {useState, useCallback} from "react";
import {TextField, FormControl} from '@material-ui/core';
import {FormattedMessage} from "react-intl";

const RequiredTextField = ({defaultName, onSetName, label}) => {
    const [value, setValue] = useState(defaultName);
    const onChange = useCallback((e) => {
        setValue(e.target.value);
        onSetName(e.target.value)
    }, [onSetName]);

    return(
        <FormControl >
            <TextField
                error={value === ""}
                value={value}
                required
                onChange={onChange}
                label={label}
                helperText={(value === "") ? 
                    <FormattedMessage id="validation.required" /> : ""}
            />
        </FormControl >
    )
}

export default RequiredTextField