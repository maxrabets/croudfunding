import React from 'react';
import { CardContent, CardMedia, Box, Typography} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import {FormattedMessage, FormattedDate} from "react-intl";

const NewsPost = ({post}) => {
    return (
        <CardContent>
            <Typography align="right" fontStyle="italic">
                <FormattedMessage id="campaigns.news.creationDate" />: 
                <FormattedDate value={post.creationDate} />
            </Typography>
            <Typography align="right" fontStyle="italic">
                <FormattedMessage id="campaigns.news.lastUpdateDate" />: 
                <FormattedDate value={post.lastModificationDate} />
            </Typography>
            <Typography variant="h5">
                {post.header}
            </Typography>
            <ReactMarkdown>{post.description}</ReactMarkdown>

            {post.image ? 
                    <CardMedia >
                        <img src={post.image.url} alt={post.image.filename}
                            style={{height: "100%", width: "100%", align: "middle"}}/>
                    </CardMedia>
                 : <></>
            }
        </CardContent>
    );
}

export default NewsPost;