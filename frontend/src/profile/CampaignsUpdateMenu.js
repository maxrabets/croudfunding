import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import {NavLink, Redirect} from "react-router-dom";
import { Typography, Breadcrumbs, Button, 
    IconButton, CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CampaignForm from "../shared/components/campaignForm/CampaignForm";
import { changeCampaign,
    getCampaign as getCampaignFromApi} from "../shared/apis/campaignsApi"
import { getCategories as getCategoriesFromApi,} from "../shared/apis/categoriesApi"

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
        getCampaignFromApi(props.match.params.id).then(campaign => { 
            if(campaign){                    
                setCamapign(campaign);            
                setIsLoaded(true);
            }
            else
                console.log('error')
        })
    }

    const getCategories = () => {
        getCategoriesFromApi().then(categories => {
            if(categories)
                setCategories(categories);
            else
                console.log('error');
        });
    }
    useEffect(getCategories, []);
    useEffect(getCampaign, [props.match.params.id, setIsLoaded]);

    const onUpdate = useCallback(async (formData) => {
        const token = await getAccessTokenSilently();
        changeCampaign(props.match.params.id, formData, token).then(cheanged => {
            if(cheanged) {
                setIsSaved(true);
            }
            else{
                console.log('error');
            }
        });
    }, [getAccessTokenSilently, props.match.params.id]);

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
            <NavLink to={`/campaigns/${props.match.params.id}`}>  
                <IconButton variant="contained" color="primary">
                    <VisibilityIcon />
                </IconButton>
            </NavLink>
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
