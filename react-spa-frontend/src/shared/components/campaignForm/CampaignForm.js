import { Button } from '@material-ui/core';
import React, {useState, useCallback} from "react";
import ReactPlayer from 'react-player';
import {FormattedMessage} from "react-intl";
import NameField from "./NameField";
import CategoriesField from "./CategoriesField";
import DescriptionField from "./DescriptionField";
import TagsField from "./TagsField";
import MoneyField from "./MoneyField";
import DateField from "./DateField";
import VideoLinkField from "./VideoLinkField";
import ImagesField from "./ImagesField";

const CampaignForm = () => {
    const [endDate, setEndDate] = useState(new Date());
    const [images, setImages] = useState([]);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [tags, setTags] = useState();
    const [targetMoney, setTargetMoney] = useState();
    const [bonuses, setBonuses] = useState();
    const [videoLink, setVideoLink] = useState();

    

    

    const onSave = useCallback(() => {
        const formData = new FormData();
        formData.set("images", images);
        formData.set("name", name);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("tags", tags);
        formData.set("targetMoney", targetMoney);
        formData.set("videoLink", videoLink);
        formData.set("endDate", endDate);
        console.log(formData);
    }, [category, description, endDate, images, name, tags, targetMoney, videoLink]);

    return (
        <form>
            <NameField onChange={(e) => setName(e.target.value)}/>
            <CategoriesField onChange={(e) => setCategory(e.target.value)}/>
            <DescriptionField onChange={(e) => setDescription(e.target.value)}/>         
            <TagsField onChange={(e) => setTags(e.detail.value)}/>
            <MoneyField onChange={(e) => setTargetMoney(e.target.value)}/>
            <DateField onPickDate={(date) => setEndDate(date)}/>
            <VideoLinkField onChange={(e) => setVideoLink(e.target.value)}/>
            <ImagesField onChange={(acceptedFiles) => setImages(acceptedFiles)}/>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={onSave}
            >
                <FormattedMessage id="campaigns.save" />
            </Button>
        </ form>
    )
}

export default CampaignForm