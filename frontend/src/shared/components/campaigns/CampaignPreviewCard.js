import React from 'react';
import {Link} from 'react-router-dom'
import { Card, Typography, CardActionArea, Box, Link as MaterialUILink} from '@material-ui/core';
import {FormattedMessage, FormattedDate} from "react-intl";
import Rating from '@material-ui/lab/Rating';
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const CampaignPreviewCard = ({campaign}) => {
    return (
        <Card component={Box} my={2} elevation={8}>
            <MaterialUILink component={Link} to={`/campaigns/${campaign.id}`} color="inherit">
                <CardActionArea>
                    <Typography variant="h5" color="secondary">
                        {campaign.name}
                    </Typography>
                    <Typography>
                        <FormattedMessage id="campaigns.category" />: 
                        {campaign.category.name}, <FormattedMessage id="campaigns.status" />: 
                        {campaign.status}
                    </Typography>  
                    <Rating value={campaign.averageRating} readOnly precision={0.1}/>
                    {campaign.tags !== [] ? <Tags
                        value={campaign.tags.map(tag => tag.name)}
                        readOnly
                    /> : <></>}                    
                    <Typography align="right" fontStyle="italic">
                        <FormattedMessage id="campaigns.startDate" />: 
                        <FormattedDate value={campaign.creationDate} />
                    </Typography>
                    <Typography align="right" fontStyle="italic">
                        <FormattedMessage id="campaigns.lastModificationDate" />: 
                        <FormattedDate value={campaign.lastModificationDate} />
                    </Typography>
                    <Typography align="right" fontStyle="italic">
                        <FormattedMessage id="campaigns.endDate" />: 
                        <FormattedDate value={campaign.endDate} />
                    </Typography>                
                </CardActionArea>
            </MaterialUILink>
        </Card>
    );
}

export default CampaignPreviewCard;