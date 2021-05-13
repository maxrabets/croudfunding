import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Breadcrumbs } from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {NavLink, Redirect} from "react-router-dom";
import CampaignForm from "../shared/components/campaignForm/CampaignForm"

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
        fetch(`/campaigns/categories`).then( response => {
            if(response.ok){
                response.json().then(categories => setCategories(categories));
            }
        })
    }
    useEffect(getCategories, []);

    const onCreate = useCallback(async (formData) => {
        console.log(formData.get("images"));
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
                setIsCreated(true);
            }
        });
    }, [getAccessTokenSilently]);

    if(isCreated)
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
                    <FormattedMessage id="links.createCampaign" />
                </Typography>
            </Breadcrumbs>

            <CampaignForm onSave={onCreate}
                defaultCampaign={defaultCampaign}
                categories={categories}
            />
        </>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
