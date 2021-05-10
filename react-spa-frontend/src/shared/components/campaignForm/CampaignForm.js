import { Button } from '@material-ui/core';
import React, {useState, useCallback} from "react";
import {FormattedMessage} from "react-intl";
import RequiredTextField from "./RequiredTextField";
import CategoriesField from "./CategoriesField";
import DescriptionField from "./DescriptionField";
import TagsField from "./TagsField";
import MoneyField from "./MoneyField";
import DateField from "./DateField";
import VideoLinkField from "./VideoLinkField";
import ImagesField from "./ImagesField";
import BonusesField from "./BonusesField";
import { Box, Dialog, DialogContent, DialogContentText, 
    DialogActions} from '@material-ui/core';

const CampaignForm = ({defaultCampaign, onSave, categories}) => {
    // const serverURL = process.env.REACT_APP_SERVER_URL;
    const [endDate, setEndDate] = useState(defaultCampaign.endDate);
    const [images, setImages] = useState(defaultCampaign.images || []);
    const [name, setName] = useState(defaultCampaign.name);
    const [description, setDescription] = useState(defaultCampaign.description);
    const [category, setCategory] = useState(defaultCampaign.category);
    const [tags, setTags] = useState(defaultCampaign.tags);
    const [targetMoney, setTargetMoney] = useState(defaultCampaign.targetMoney);
    const [bonuses, setBonuses] = useState(defaultCampaign.bonuses);
    const [videoLink, setVideoLink] = useState(defaultCampaign.videoLink);
    const [isInvalid, setIsInvalid] = useState(false);

    const onChangeTags = useCallback((e) => {
        const tagsObjects = JSON.parse(e.detail.value);
        const tags = tagsObjects.map(tagObject => tagObject.value);
        setTags(tags);
    }, []);

    const onSubmit = useCallback(async() => {
        const formData = new FormData();
        if(name==="" || !categories.includes(category) || !targetMoney
            || targetMoney < 0 || endDate < Date.now()){
            setIsInvalid(true);
            return;
        }
        images.forEach(image => {
            formData.append("images", image);
        });
        formData.set("name", name);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("tags", tags);
        formData.set("targetMoney", targetMoney);
        formData.set("videoLink", videoLink);
        formData.set("endDate", endDate);
        formData.set("bonuses", JSON.stringify(bonuses));
        onSave(formData);
    }, [bonuses, categories, category, description, endDate, 
        images, name, onSave, tags, targetMoney, videoLink]);

    return (
        <form>
            <Box m={4}>                
                <RequiredTextField onSetName={(name) => setName(name)} 
                    defaultName={defaultCampaign.name}
                    label={<FormattedMessage id="campaigns.name" />}
                />
            </Box>
            <Box m={4}> 
                <CategoriesField onSetCategory={(value) => setCategory(value)}
                    categories={categories} defaultCategory={defaultCampaign.category}
                />
            </Box>
            <Box m={4}> 
                <DescriptionField onChange={(editor, data, value) => {
                    setDescription(value);}}
                    defaultDescription={defaultCampaign.description}
                />
            </Box>
            <Box m={4}>     
                <TagsField onChange={onChangeTags} defaultTags={defaultCampaign.tags}/>
            </Box>
            <Box m={4}>                
                <MoneyField onSetMoney={(money) => setTargetMoney(money)}
                    defaultMoney={defaultCampaign.targetMoney}                
                    label={<FormattedMessage id="campaigns.targetAmount" />}
                />
            </Box>
            <Box m={4}> 
                <DateField onPickDate={(date) => setEndDate(date)}
                    defaultDate={defaultCampaign.endDate}
                />
            </Box>
            <Box m={4} width={3/5}> 
                <VideoLinkField defaultVideoLink={defaultCampaign.videoLink}
                    onChange={(value) => setVideoLink(value)}/>
            </Box>
            <Box m={4}> 
                <ImagesField defaultImages={defaultCampaign.images}
                    onChange={(acceptedFiles) => setImages(acceptedFiles)}/>
            </Box>
            <Box m={4}>  
                <BonusesField onChange={(bonuses) => setBonuses(bonuses)}
                    defaultBonus={defaultCampaign.defaultBonus} 
                    defaultBonuses={defaultCampaign.bonuses}/>
            </Box>
            <Dialog
                open={isInvalid}
                onClose={() =>  setIsInvalid(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
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

export default CampaignForm