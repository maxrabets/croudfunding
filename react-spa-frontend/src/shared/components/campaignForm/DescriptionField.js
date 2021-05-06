import React from "react";
import {InputLabel, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import MarkdownEditor from '@uiw/react-markdown-editor';

const DescriptionField = ({onChange}) => {

    return(
        <Box m={4}>
            <InputLabel id="description-label">
                <FormattedMessage id="campaigns.description" />
            </InputLabel>
            <MarkdownEditor
                onChange={onChange}
                height={100}
            />
        </ Box>
    )
}

export default DescriptionField