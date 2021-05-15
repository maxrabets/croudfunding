import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Breadcrumbs, Box } from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {NavLink, Redirect} from "react-router-dom";
import CampaignForm from "../shared/components/campaigns/CampaignForm"
import {getCategories as getCategoriesFromApi} from "../shared/apis/categoriesApi"
import {createCampaign} from "../shared/apis/campaignsApi"

const CampaignsCreateMenu = () => {
    const { isAuthenticated } = useAuth0();        
    const { getAccessTokenSilently } = useAuth0();
    const [isCreated, setIsCreated] = useState(false);
    const [categories, setCategories] = useState([]);
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    const defaultCampaign = {name: "MyCampaign", category:"IT", targetMoney: 100, 
        defaultBonus: {name: "MyBonus", description: "BonusDescription", price: 10}, 
        bonuses: [], description: "MyDescrition", endDate: tomorrow, tags: "tag1,tag2",
        images: [], videoLink: ""
    };    

    const getCategories = () => {
        getCategoriesFromApi().then(categories => {
            if(categories)
                setCategories(categories);
            else
                console.log('error');
        });        
    }
    useEffect(getCategories, []);

    const onCreate = useCallback(async (formData) => {
        const token = await getAccessTokenSilently();
        createCampaign(formData, token).then(created => {
            setIsCreated(created);
        });
    }, [getAccessTokenSilently]);

    if(isCreated)
        return <Redirect to="/profile/campaigns" ></Redirect>

    if(isAuthenticated) {
        return (
        <Box m={2}>
            <Breadcrumbs aria-label="breadcrumb">
                <NavLink color="inherit" to="/profile" >
                    <FormattedMessage id="links.profile" />
                </NavLink>
                <NavLink color="inherit" to="/profile/campaigns">
                    <FormattedMessage id="links.myCampaigns" />
                </NavLink>
                <Typography color="textPrimary">
                    <FormattedMessage id="links.createCampaign" />
                </Typography>
            </Breadcrumbs>

            <CampaignForm onSave={onCreate}
                defaultCampaign={defaultCampaign}
                categories={categories}
            />
        </Box>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
