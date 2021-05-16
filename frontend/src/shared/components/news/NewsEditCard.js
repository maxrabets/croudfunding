import React from 'react';
import { Card, Box, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import NewsPostContent from './NewsPostContent';

const NewsEditCard = ({post, onEdit, onClose}) => {
    return (
        <Card component={Box} m={2} elevation={8}>
            <IconButton 
                edge="start"
                color="inherit" aria-label="close"
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <IconButton 
                edge="start"
                color="inherit" aria-label="close"
                onClick={onEdit}
            >
                <EditIcon />
            </IconButton>
            <NewsPostContent post={post} />
        </Card>
    );
}

export default NewsEditCard;