import React, {useState, useCallback} from 'react';
import {TextField} from '@material-ui/core';
import {search} from "../apis/campaignsApi";
import CampaignSearchItem from "./campaigns/CampaignSearchItem";

 function SearchMenu() {
    const [query, setQuery] = useState("");
    const [campaigns, setCampaigns] = useState([]);

    const onChange = useCallback((e) => {
        setQuery(e.target.value);
        search(e.target.value, 3).then(campaigns => {
            if(campaigns) {
                setCampaigns(campaigns);
            }
        })
    }, [])

    return (
        <>
        <TextField value={query} onChange={onChange}/>
        {campaigns.map(campaign => <CampaignSearchItem key={campaign.id} campaign={campaign}/>)}
        </>
    );
}

export default SearchMenu;