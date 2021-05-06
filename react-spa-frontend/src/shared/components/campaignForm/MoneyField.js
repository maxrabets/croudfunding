import React from "react";
import {TextField, FormControl, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl";

const MoneyField = ({onChange}) => {

    return(
        <Box m={4}>
            <FormControl >
                <TextField
                    onChange={onChange}
                    label={<FormattedMessage id="campaigns.targetAmount" />}
                />
            </FormControl >
        </Box>
    )
}

export default MoneyField