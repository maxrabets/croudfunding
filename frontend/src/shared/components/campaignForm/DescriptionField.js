import React from "react";
import {InputLabel} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import MarkdownEditor from '@uiw/react-markdown-editor';

const DescriptionField = ({onChange, defaultDescription}) => {

    return(
        <>
            <InputLabel id="description-label">
                <FormattedMessage id="campaigns.description" />
            </InputLabel>
            <MarkdownEditor
                value={defaultDescription}
                onChange={onChange}
                height={100}
            />
        </>
    )
}

export default DescriptionField