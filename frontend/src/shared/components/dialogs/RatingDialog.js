import React, { useCallback, useState,  } from "react";
import { DialogContent, Dialog, DialogTitle, DialogActions, Button} from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import { rateCamapaign } from "../../apis/ratingsApi";
import Rating from '@material-ui/lab/Rating';

const RatingDialog = ({campaignId, isOpen, onClose}) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [ rating, setRating ] = useState(0)

    const onRate = useCallback(async () => {
        const token = await getAccessTokenSilently();
        rateCamapaign(campaignId, rating, token).then(averageRating => {            
            if(averageRating) {
                onClose(averageRating);
            }
            else
                alert("error");
        })
    }, [campaignId, getAccessTokenSilently, onClose, rating])


    if(!isAuthenticated)
        return <></>

    return (
    <Dialog open={isOpen} onClose={() => onClose()} >
        <DialogTitle id="form-dialog-title">
            <FormattedMessage id="campaigns.ratings.rate"/>
        </DialogTitle>

        <DialogContent>
            <Rating value={rating} name="rating" 
                onChange={(event, newRating) => setRating(newRating)}/>
        </DialogContent>

        <DialogActions>
            <Button onClick={onRate} color="primary">
                <FormattedMessage id="campaigns.ratings.rate"/>
            </Button>
            <Button onClick={() => onClose()} color="primary">
                <FormattedMessage id="dialog.cancel"/>
            </Button>
        </DialogActions>
    </Dialog>
    );
}

export default RatingDialog;
