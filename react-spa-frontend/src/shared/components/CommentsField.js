import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FormattedMessage} from "react-intl";
import Comment from "./Comment";

 const CommentsField = ({comments}) => {

    return (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography >
                    <FormattedMessage id="campaign.comments" />
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {comments.map(comment => <Comment comment={comment} />)}
            </AccordionDetails>
        </Accordion>
    );
}

export default CommentsField;