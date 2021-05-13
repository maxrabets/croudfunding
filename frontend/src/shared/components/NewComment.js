import React, {useCallback, useRef} from 'react';
import { Button, TextField} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useAuth0 } from "@auth0/auth0-react";

const NewComment = ({campaignId, onAdded}) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const commentRef = useRef();

    const onAdd = useCallback(async () => {
        if(isAuthenticated) {
            console.log(commentRef.current.value);
            const token = await getAccessTokenSilently();
            fetch(`/campaigns/${campaignId}/comments`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({commentText: commentRef.current.value})
            }).then(response => {
                console.log(response);
                if(response.ok) 
                    response.json().then(newComment => onAdded(newComment));                
                else
                    alert("error");
            });
            }
    }, [campaignId, getAccessTokenSilently, isAuthenticated, onAdded])

    return (    
        <>    
            <TextField multiline inputRef={commentRef}/>
            <Button variant="contained"  color="primary" onClick={onAdd}>
                <FormattedMessage id="campaigns.comments.add"/>
            </Button>
        </>
    );
}

export default NewComment;