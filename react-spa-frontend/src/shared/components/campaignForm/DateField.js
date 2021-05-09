import React, {useState, useCallback} from "react";
import { InputLabel } from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateField = ({onPickDate, defaultDate}) => {
    const [endDate, setEndDate] = useState(defaultDate);
    const onChange = useCallback(date => {
        setEndDate(date);
        onPickDate(date);
    }, [onPickDate]);

    return(
        <>
            <InputLabel id="date-label">
                <FormattedMessage id="campaigns.endDate" />
            </InputLabel>
            <DatePicker selected={endDate} onChange={onChange} minDate={new Date()}/>
        </>
    )
}

export default DateField