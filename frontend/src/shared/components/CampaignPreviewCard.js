import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import Rating from '@material-ui/lab/Rating';

const CampaignPreviewCard = ({campaign}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    {campaign.name}
                </Typography>
                <Typography>
                    <FormattedMessage id="campaigns.creationDate" />: 
                    {campaign.category}
                </Typography>                
                <Rating value={campaign.rating} readOnly precision={0.1}/>
                <Typography align="right" fontStyle="italic">
                    <FormattedMessage id="campaigns.creationDate" />: 
                    {campaign.creationDate}
                </Typography>
                <Typography align="right" fontStyle="italic">
                    <FormattedMessage id="campaigns.lastUpdateDate" />: 
                    {campaign.lastModificationDate}
                </Typography>
                <Typography align="right" fontStyle="italic">
                    <FormattedMessage id="campaigns.lastUpdateDate" />: 
                    {campaign.endDate}
                </Typography>                
            </CardContent>
        </Card>
    );
}

export default CampaignPreviewCard;