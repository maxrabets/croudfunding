import React from 'react';
import {FormattedMessage} from "react-intl"

export default function Main() {
    console.log(process.env);
    return <h3><FormattedMessage id="main.header"></FormattedMessage></h3>
}