import React from 'react';
import { Card, CardContent, Typography, Box} from '@material-ui/core';
import {FormattedMessage, FormattedDate} from "react-intl";
import UserLink from "../users/UserLink";
import Reactions from "../Reactions";

const Comment = ({comment}) => {
    return (
        <Box width="100%" my={3}>
            <Card>
                <CardContent>
                    <UserLink user={comment.user}/>
                    <Typography align="right" fontStyle="italic">
                        <FormattedMessage id="campaigns.comments.creationDate" />: 
                        <FormattedDate value={comment.creationDate} />
                    </Typography>
                    <Typography>
                        {comment.text}
                    </Typography>
                    <Reactions commentId={comment.id} campaignId={comment.campaignId}/>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Comment;