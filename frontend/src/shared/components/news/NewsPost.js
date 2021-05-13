import React from 'react';
import { Card, CardContent, CardMedia,
    Typography} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import {FormattedMessage} from "react-intl";

const NewsEditCard = ({post}) => {
    return (
        <Card>
            <CardContent>
                <Typography align="right" fontStyle="italic">
                    <FormattedMessage id="campaigns.news.creationDate" />: 
                    {post.creationDate}
                </Typography>
                <Typography align="right" fontStyle="italic">
                    <FormattedMessage id="campaigns.news.lastUpdateDate" />: 
                    {post.lastModificationDate}
                </Typography>
                <Typography variant="h5">
                    {post.header}
                </Typography>
                <ReactMarkdown>{post.description}</ReactMarkdown>
                {post.image ? 
                    <CardMedia><img src={post.image.url} alt={post.image.filename}/></CardMedia> : <></>
                }
            </CardContent>
        </Card>
    );
}

export default NewsEditCard;