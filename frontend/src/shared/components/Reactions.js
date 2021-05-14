import React, {useState, useEffect, useCallback} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {getReactions as getReactionsFromApi, createRaction} from "../apis/reactionsApi";

const Reactions = ({campaignId, commentId}) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [likesCount, setLlikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);

    const getReactions = () => {
        getReactionsFromApi(campaignId, commentId).then(reactionTypesCount => {
            if(reactionTypesCount) {
                setLlikesCount(reactionTypesCount.get("like"));
                setDislikesCount(reactionTypesCount.get("dislike"));
            }
            else{
                console.log("error")
            }
        });
    }
    useEffect(getReactions, [campaignId, commentId]);

    const onReaction = useCallback(async (reactionType) => {
        if(isAuthenticated) {
            const token = await getAccessTokenSilently();
            createRaction(campaignId, commentId, reactionType, token).then(created => {
                if(created){                    
                    if(reactionType === "like")
                        setLlikesCount(likesCount + 1);
                    else
                        setDislikesCount(dislikesCount + 1);
                }
                else{
                    console.log("error");
                }
            })
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