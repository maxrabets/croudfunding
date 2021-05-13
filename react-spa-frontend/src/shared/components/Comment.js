import React from 'react';
import { Card, CardContent, CardMedia,
    Typography} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import UserLink from "./UserLink";

const Comment = ({comment}) => {
    return (
        <Card>
            <CardContent>
                <UserLink user={comment.user}/>
                <Typography align="right" fontStyle="italic">
                    <FormattedMessage id="campaigns.comments.creationDate" />: 
                    {comment.creationDate}
                </Typography>
                <Typography >
                    {comment.text}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Comment;