import React from 'react';
import { Button, TextField} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const NewComment = ({user}) => {
    

    return (    
        <>    
            <TextField multiline/>
            <Button onClick={onAdd}><FormattedMessage id="campaigns.comments.add"/></Button>
        </>
    );
}

export default NewComment;