import React, {useState, useCallback} from "react";
import {TextField, FormControl} from '@material-ui/core';
import {FormattedMessage} from "react-intl";

const MoneyField = ({defaultMoney, onSetMoney, label}) => {
    const [money, setMoney] = useState(defaultMoney);
    
    const onChange = useCallback((e) => {
        setMoney(e.target.value);
        onSetMoney(e.target.value)
    }, [onSetMoney]);

    return(
            <FormControl >
                <TextField
                    inputProps={{min: "0"}}
                    error={money === ""}
                    value={money}
                    required
                    onChange={onChange}
                    type="number"
                    label={label}
                    helperText={(money === "") ? 
                        <FormattedMessage id="validation.required" /> : ""}
                />
            </FormControl >
    )
}

export default MoneyField