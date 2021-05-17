import React from 'react';
import {Link} from 'react-router-dom'
import { Card, Typography, CardActionArea,  Link as MaterialUILink} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const CampaignSearchItem = ({campaign}) => {
    return (
        <Card>
            <MaterialUILink component={Link} to={`/campaigns/${campaign.id}`} color="inherit">
                <CardActionArea>
                    <Typography variant="h5" color="secondary">
                        {campaign.name}
                    </Typography>
                    <Rating value={campaign.averageRating} readOnly precision={0.1}/>   
                </CardActionArea>
            </MaterialUILink>
        </Card>
    );
}

export default CampaignSearchItem;