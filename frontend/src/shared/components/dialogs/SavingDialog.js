import React from "react";
import { DialogContent, Dialog, DialogActions, Button, Typography,
    CircularProgress } from '@material-ui/core';
import {FormattedMessage} from "react-intl";

const SavingDialog = ({isOpen, onClose, isSaved, result}) => {

    return (
    <Dialog open={isOpen}>
        <DialogContent>
            {isSaved ? <Typography>{result}</Typography>  : <CircularProgress />}
        </DialogContent>
        <DialogActions>
            {isSaved ?
                <Button onClick={onClose} color="primary">
                    <FormattedMessage id="dialog.ok"/>
                </Button>
                : <></>
            }
        </DialogActions>
    </Dialog>
    );
}

export default SavingDialog;
