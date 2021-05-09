import React, {useState, useCallback} from "react";
import {TextField, FormControl} from '@material-ui/core';
import {FormattedMessage} from "react-intl";

const RequiredTextField = ({defaultName, onSetName, label}) => {
    const [name, setName] = useState(defaultName);
    const onChange = useCallback((e) => {
        setName(e.target.value);
        onSetName(e.target.value)
    }, [onSetName]);

    return(
        <FormControl >
            <TextField
                error={name === ""}
                value={name}
                required
                onChange={onChange}
                label={label}
                helperText={(name === "") ? 
                    <FormattedMessage id="validation.required" /> : ""}
            />
        </FormControl >
    )
}

export default RequiredTextField