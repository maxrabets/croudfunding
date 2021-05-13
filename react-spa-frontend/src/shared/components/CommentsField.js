import React, {useState, useEffect} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FormattedMessage} from "react-intl";
import Comment from "./Comment";
import NewComment from "./NewComment";

 const CommentsField = ({campaignId}) => {
    const [comments, setComments] = useState([]);

    const getComments = () => {
        fetch(`/campaigns/${campaignId}/comments`).then( response => {
            if(response.ok){
                response.json().then(comments => {
                    console.log(comments)
                    setComments(comments);
                });
            }
            else{
                console.log(response);
            }
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
                {comments.map(comment => <Comment comment={comment} />)}
                <NewComment campaignId={campaignId} 
                    onAdded={(comment) => setComments(comments.concat([comment]))}
                />
            </AccordionDetails>
        </Accordion>
    );
}

export default CommentsField;