import React from "react";
import { InputLabel} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const TagsField = ({onChange, defaultTags}) => {

    return(
        <>
            <InputLabel id="tags-label">
                <FormattedMessage id="campaigns.tags" />
            </InputLabel>
            <Tags
                value={defaultTags}
                onChange={onChange}
            />
        </>
    )
}

export default TagsField