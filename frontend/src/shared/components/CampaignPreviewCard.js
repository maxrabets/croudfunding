import React from 'react';
import {Link} from 'react-router-dom'
import { Card, Typography, CardActionArea} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import Rating from '@material-ui/lab/Rating';
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const CampaignPreviewCard = ({campaign}) => {
    return (
        <Card>
            <Link to={`/campaigns/${campaign.id}`}>
                <CardActionArea>
                    <Typography variant="h4">
                        {campaign.name}
                    </Typography>
                    <Typography>
                        <FormattedMessage id="campaigns.category" />: 
                        {campaign.category.name}
                    </Typography>  
                    <Rating value={campaign.averageRating} readOnly precision={0.1}/>
                    <Tags
                        value={campaign.tags.map(tag => tag.name)}
                        readOnly
                    />
                    <Typography align="right" fontStyle="italic">
                        <FormattedMessage id="campaigns.startDate" />: 
                        {campaign.creationDate}
                    </Typography>
                    <Typography align="right" fontStyle="italic">
                        <FormattedMessage id="campaigns.lastModificationDate" />: 
                        {campaign.lastModificationDate}
                    </Typography>
                    <Typography align="right" fontStyle="italic">
                        <FormattedMessage id="campaigns.endDate" />: 
                        {campaign.endDate}
                    </Typography>                
                </CardActionArea>
            </Link>
        </Card>
    );
}

export default CampaignPreviewCard;