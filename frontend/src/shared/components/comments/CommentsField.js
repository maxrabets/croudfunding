import React, {useState, useEffect} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box,
     Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FormattedMessage} from "react-intl";
import Comment from "./Comment";
import NewComment from "./NewComment";
import {getComments as getCommentsFromApi} from "../../apis/commentsApi";

 const CommentsField = ({campaignId}) => {
    const [comments, setComments] = useState([]);

    const getComments = () => {
        getCommentsFromApi(campaignId).then(comments => {
            if(comments)
                setComments(comments);
            else
                console.log("error");
        })
    }
    useEffect(getComments, [campaignId]);

    return (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography >
                    <FormattedMessage id="campaigns.comments" />
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box my={3} maxWidth="100%">
                    {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                    <Box my={3}>
                        <NewComment campaignId={campaignId} 
                            onAdded={(comment) => setComments(comments.concat([comment]))}
                        />
                    </Box>
                    </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default CommentsField;