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
import { Box } from '@material-ui/core';

const CampaignForm = ({defaultCampaign, onSave, categories}) => {
    // const serverURL = process.env.REACT_APP_SERVER_URL;
    const [endDate, setEndDate] = useState(new Date());
    const [images, setImages] = useState([]);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [tags, setTags] = useState();
    const [targetMoney, setTargetMoney] = useState();
    const [bonuses, setBonuses] = useState([]);
    const [videoLink, setVideoLink] = useState();

    const onChangeTags = useCallback((e) => {
        const tagsObjects = JSON.parse(e.detail.value);
        const tags = tagsObjects.map(tagObject => tagObject.value);
        setTags(tags);
    }, []);

    const onSubmit = useCallback(async() => {
        const formData = new FormData();
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
        console.log(bonuses);
        onSave(formData);
    }, [bonuses, category, description, endDate, images, 
        name, onSave, tags, targetMoney, videoLink]);

    return (
        <form>
            <Box m={4}>                
                <RequiredTextField onSetName={(name) => setName(name)} 
                    defaultName={defaultCampaign.name}
                    label={<FormattedMessage id="campaigns.name" />}
                />
            </Box>
            <Box m={4}> 
                <CategoriesField onChange={(e) => setCategory(e.target.value)}
                    categories={categories}
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
            {/* <Box m={4} width={3/5}> 
                <VideoLinkField onChange={(value) => setVideoLink(value)}/>
            </Box>
            <Box m={4}> 
                <ImagesField onChange={(acceptedFiles) => setImages(acceptedFiles)}/>
            </Box> */}
            <Box m={4}>  
                <BonusesField onChange={(bonuses) => setBonuses(bonuses)}
                    defaultBonus={defaultCampaign.defaultBonus} 
                    defaultBonuses={defaultCampaign.bonuses}/>
            </Box>
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