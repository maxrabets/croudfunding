import React from 'react';
import {FormattedMessage} from "react-intl";
import { Box, Typography } from '@material-ui/core';

export default function About() {
    return (
        <Box m={2}>
            <Typography variant="h6"><FormattedMessage id="about.header" /></Typography>
            <Typography align="justify"><FormattedMessage id="about.text" /></Typography>
        </ Box>
    )
}