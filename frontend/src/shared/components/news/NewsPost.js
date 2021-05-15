import React from 'react';
import { Card, Box } from '@material-ui/core';
import NewsPostContent from './NewsPostContent';

const NewsPost = ({post}) => {
    return (
        <Card component={Box} m={2} elevation="8">
            <NewsPostContent post={post} />
        </Card>
    );
}

export default NewsPost;