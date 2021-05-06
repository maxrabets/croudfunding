import React, {useState, useCallback} from "react";
import { InputLabel, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateField = ({onPickDate}) => {
    const [endDate, setEndDate] = useState(new Date());
    const onChange = useCallback(date => {
        setEndDate(date);
        onPickDate(Date);
    }, [onPickDate]);

    return(
        <Box m={4}>
            <InputLabel id="date-label">
                <FormattedMessage id="campaigns.endDate" />
            </InputLabel>
            <DatePicker selected={endDate} onChange={onChange} />
        </Box>
    )
}

export default DateField