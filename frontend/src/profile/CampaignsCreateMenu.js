import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Breadcrumbs, Box, Link as MaterialUILink } from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {NavLink, Redirect} from "react-router-dom";
import CampaignForm from "../shared/components/campaigns/CampaignForm"
import SavingDialog from "../shared/components/dialogs/SavingDialog"
import {getCategories as getCategoriesFromApi} from "../shared/apis/categoriesApi"
import {createCampaign} from "../shared/apis/campaignsApi"

const CampaignsCreateMenu = () => {
    const { isAuthenticated } = useAuth0();        
    const { getAccessTokenSilently } = useAuth0();
    const [isCreated, setIsCreated] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isSavingDialogOpen, setIsSavingDialogOpen] = useState(false);
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    const defaultCampaign = {name: "", category:"IT", targetMoney: 100, 
        defaultBonus: {name: "", description: "", price: 10}, 
        bonuses: [], description: "", endDate: tomorrow, tags: "",
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
        setIsSavingDialogOpen(true);
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
                <MaterialUILink component={NavLink} to="/profile" color="secondary">
                    <FormattedMessage id="links.profile" />
                </MaterialUILink>
                <MaterialUILink component={NavLink} to="/profile/campaigns" color="secondary">
                    <FormattedMessage id="links.myCampaigns" />
                </MaterialUILink>
                <Typography color="textPrimary">
                    <FormattedMessage id="links.createCampaign" />
                </Typography>
            </Breadcrumbs>

            <CampaignForm onSave={onCreate}
                defaultCampaign={defaultCampaign}
                categories={categories}
            />
            <SavingDialog isOpen={isSavingDialogOpen} isSaved={isCreated}
                result={<FormattedMessage id="savingDialog.saved" />}
                onClose={() => setIsSavingDialogOpen(false)}
            />
        </Box>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
