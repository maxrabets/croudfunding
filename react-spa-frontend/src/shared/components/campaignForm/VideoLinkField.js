import React, {useState, useCallback} from "react";
import {TextField, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {ReactTinyLink} from 'react-tiny-link';

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

const VideoLinkField = ({onChange, defaultVideoLink}) => {
    const [isYouTubeLink, setIsYouTubeLink] = useState(false);    
    const [videoLink, setVideoLink] = useState(defaultVideoLink || "");

    const checkLink = useCallback(e => {
        if(matchYoutubeUrl(e.target.value)) {
            setIsYouTubeLink(false);
        }
        else {
            setIsYouTubeLink(false);
        }
        setVideoLink(e.target.value);
        onChange(e.target.value);
    }, [onChange]);

    return(
        <>
            <TextField
                value={videoLink}
                onChange={checkLink}
                label={<FormattedMessage id="campaigns.video" />}
            />
            {isYouTubeLink ? <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={videoLink}
                onError={(err) => console.log(err)}
            /> : <></>}
            
        </>
    )
}

export default VideoLinkField