import React, {useState, useEffect, useCallback} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Reactions = ({campaignId, commentId}) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [likesCount, setLlikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);

    const getReactions = () => {
        fetch(`/campaigns/${campaignId}/comments/${commentId}/reactions`).then(response => {
            if(response.ok){
                response.json().then(reactionTypesCount => {
                    console.log(reactionTypesCount)
                    reactionTypesCount = new Map(JSON.parse(reactionTypesCount));
                    console.log(reactionTypesCount)
                    setLlikesCount(reactionTypesCount.get("like"));
                    setDislikesCount(reactionTypesCount.get("dislike"));
                });
            }
            else{
                console.log(response);
            }
        })
    }
    useEffect(getReactions, [campaignId, commentId]);

    const onReaction = useCallback(async (reactionType) => {
        if(isAuthenticated) {
            const token = await getAccessTokenSilently();
            fetch(`/campaigns/${campaignId}/comments/${commentId}/reactions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({reactionType})
            }).then(response => {
                console.log(response);
                if(response.ok) {
                    if(reactionType === "like")
                        setLlikesCount(likesCount + 1);
                    else
                        setDislikesCount(dislikesCount + 1);
                }
            });
        }
    }, [campaignId, commentId, dislikesCount, getAccessTokenSilently, isAuthenticated, likesCount])

    return (
        <>
            <IconButton 
                onClick={() => onReaction("like")}
            >
                <ThumbUpIcon /> {likesCount}
            </IconButton>
            <IconButton 
                onClick={() => onReaction("dislike")}
            >
                <ThumbDownIcon /> {dislikesCount}
            </IconButton>
        </>
    );
}

export default Reactions;