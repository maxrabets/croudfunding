import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import {NavLink, Redirect} from "react-router-dom";
import { Typography, Breadcrumbs, Button, 
    IconButton, CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import parseISO from "date-fns/parseISO"
import CampaignForm from "../shared/components/campaignForm/CampaignForm";

const CampaignsCreateMenu = (props) => {
    const { isAuthenticated } = useAuth0();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const [isSaved, setIsSaved] = useState(false);
    const [categories, setCategories] = useState([]);
    const [campaign, setCamapign] = useState();
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    console.log(props.match.params.id);

    const getCampaign = () => {
        fetch(`/campaigns/${props.match.params.id}`).then( response => {
            if(response.ok){
                response.json().then(campaign => {
                    campaign.endDate = parseISO(campaign.endDate);
                    campaign.category = campaign.category.name;
                    campaign.images = campaign.images.map(image => {
                        console.log(image.buffer.data);
                        return new File([Buffer.from(image.buffer)], image.name,
                            //{type: "image/jpeg"}
                        )
                    })
                    campaign.tags = campaign.tags.map(tag => tag.name);
                    setCamapign(campaign);                    
                    setIsLoaded(true);
                });
            }
            else{
                alert("error");
            }
        })
    }

    const getCategories = () => {
        fetch(`/campaigns/categories`).then( response => {
            if(response.ok){
                response.json().then(categories => setCategories(categories));
            }
        })
    }
    useEffect(getCategories, []);
    useEffect(getCampaign, [props.match.params.id, setIsLoaded]);

    const onUpdate = useCallback(async (formData) => {
        const token = await getAccessTokenSilently();
        fetch(`/campaigns`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }).then(response => {
            console.log(response);
            if(response.ok) {
                setIsSaved(true);
            }
        });
    }, [getAccessTokenSilently]);

    if(!isLoaded)
        return <CircularProgress />;

    if(isSaved)
        return <Redirect to="/profile/campaigns" ></Redirect>

    if(isAuthenticated) {
        return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <NavLink color="inherit" to="/profile" >
                    <FormattedMessage id="links.profile" />
                </NavLink>
                <NavLink color="inherit" to="/profile/campaigns">
                    <FormattedMessage id="links.myCampaigns" />
                </NavLink>
                <Typography color="textPrimary">
                    <FormattedMessage id="links.updateCampaign" />
                </Typography>
            </Breadcrumbs>

            <NavLink to={`${props.match.params.id}/news`}>                
                <Button variant="contained" color="primary">
                    <FormattedMessage id="campaigns.news" />
                </Button>
            </NavLink>
            <IconButton variant="contained" color="primary">
                <VisibilityIcon />
            </IconButton>
            <CampaignForm onSave={onUpdate}
                defaultCampaign={campaign}
                categories={categories}
            />
        </>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
