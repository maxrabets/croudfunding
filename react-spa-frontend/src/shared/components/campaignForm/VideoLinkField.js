import React, {useState, useCallback} from "react";
import {TextField} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import ReactPlayer from 'react-player/youtube';

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

const VideoLinkField = ({onChange, defaultVideoLink}) => {
    const [isYouTubeLink, setIsYouTubeLink] = useState(matchYoutubeUrl(defaultVideoLink));    
    const [videoLink, setVideoLink] = useState(defaultVideoLink || "");

    const checkLink = useCallback(e => {
        setIsYouTubeLink(matchYoutubeUrl(e.target.value));
        setVideoLink(e.target.value);
        onChange(e.target.value);
    }, [onChange]);

    return(
        <>
            <TextField
                fullWidth
                value={videoLink}
                onChange={checkLink}
                label={<FormattedMessage id="campaigns.video" />}
            />
            {isYouTubeLink ? <ReactPlayer
                url={videoLink}
            /> : <></>}
            
        </>
    )
}

export default VideoLinkField