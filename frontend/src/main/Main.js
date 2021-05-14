import React from 'react';
import {FormattedMessage} from "react-intl"
import { Select, MenuItem } from '@material-ui/core';

export default function Main() {
    const filters = ["topRated", "lastUpdated"]
    // console.log(process.env);
    return (
        <>
            <h3><FormattedMessage id="main.header"></FormattedMessage></h3>
            <Select
                required
                defaultValue={filters[0]}
                onChange={() => console.log("changed")}
            >
                {filters.map(filter => 
                    <MenuItem key={filter} value={filter}>
                        <FormattedMessage id={`filters.${filter}`}>
                    </FormattedMessage></MenuItem>
                )}
            </Select>
        </>
    )
}