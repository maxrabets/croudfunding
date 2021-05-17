import React from "react";
import { Typography } from '@material-ui/core';

const ProgressBar = ({now, target}) => {
    return <Typography display="inline"> {now}/{target}</Typography>
}

export default ProgressBar;