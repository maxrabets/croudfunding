import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia,
    Typography, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const MediaCard = ({filename, image, onClose}) => {
    console.log(image);
    return (
        <Card>        
            <IconButton 
                edge="start"
                color="inherit" aria-label="close"
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <CardActionArea>
                <CardMedia>
                    <img src={image} alt={image} style={{height:"10vw", width:"10vw"}}/>
                </CardMedia>
                <CardContent>
                    <Typography>
                        {filename}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MediaCard;