import React, {useState, useCallback} from "react";
import {TextField} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import ReactPlayer from 'react-player/youtube';
import {matchYoutubeUrl} from "../../validators/VideoLinkValidator";

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