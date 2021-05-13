import React from 'react';
import { Card, CardContent, CardMedia,
    Typography, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ReactMarkdown from 'react-markdown';

const NewsEditCard = ({header, description, image, onEdit, onClose}) => {
    return (
        <Card>        
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
            <CardContent>
                <Typography variant="h5">
                    {header}
                </Typography>
                <ReactMarkdown>{description}</ReactMarkdown>
                {image ? 
                <CardMedia><img src={image} alt={image}/></CardMedia> : <></>}
            </CardContent>
        </Card>
    );
}

export default NewsEditCard;