import { Button } from '@material-ui/core';
import React, {useState, useCallback} from "react";
import {FormattedMessage} from "react-intl";
import RequiredTextField from "../campaignForm/RequiredTextField";
import DescriptionField from "../campaignForm/DescriptionField";
import ImagesField from "../campaignForm/ImagesField";
import { Box, Dialog, DialogContent, DialogContentText, 
    DialogActions} from '@material-ui/core';

const NewsForm = ({defaultPost, onSave}) => {
    const [image, setImage] = useState(defaultPost.image);
    const [header, setHeader] = useState(defaultPost.header);
    const [description, setDescription] = useState(defaultPost.description);
    const [isInvalid, setIsInvalid] = useState(false);

    const onSubmit = useCallback(() => {
        const formData = new FormData();
        if(header === "" || description === ""){
            setIsInvalid(true);
            return;
        }
        formData.set("image", image);
        formData.set("header", header);
        formData.set("description", description);
        onSave(formData, defaultPost.id);
    }, [header, description, image, onSave, defaultPost.id]);

    return (
        <form>
            <Box m={4}>                
                <RequiredTextField onSetName={(header) => setHeader(header)} 
                    defaultName={header}
                    label={<FormattedMessage id="campaigns.news.header" />}
                />
            </Box>
            <Box m={4}>
                <DescriptionField onChange={(editor, data, value) => {
                    setDescription(value);}}
                    defaultDescription={description}
                />
            </Box>
            <Box m={4}> 
                <ImagesField defaultImages={image ? [image] : []}
                    onChange={(acceptedFiles) => setImage(acceptedFiles[0])}
                    max="1"
                />
            </Box>
            <Dialog
                open={isInvalid}
                onClose={() =>  setIsInvalid(false)}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormattedMessage id="campaigns.form.invalid" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() =>  setIsInvalid(false)} color="primary">
                        <FormattedMessage id="dialog.ok" />
                    </Button>
                </DialogActions>
            </Dialog>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={onSubmit}
            >
                <FormattedMessage id="campaigns.save" />
            </Button>
        </ form>
    )
}

export default NewsForm;