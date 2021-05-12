import React from 'react';
import { Card, CardContent, CardMedia,
    Typography} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

const NewsEditCard = ({post}) => {
    return (
        <Card>
            <CardContent>
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