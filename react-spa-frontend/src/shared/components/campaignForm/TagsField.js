import React from "react";
import { InputLabel, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const TagsField = ({onChange}) => {

    return(
        <Box  m={4}>
            <InputLabel id="tags-label">
                <FormattedMessage id="campaigns.tags" />
            </InputLabel>
            <Tags
                onChange={onChange}
            />
        </Box>
    )
}

export default TagsField