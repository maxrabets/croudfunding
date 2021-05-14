import React, { useState, useCallback, useEffect } from 'react';
import {FormattedMessage} from "react-intl"
import { Select, MenuItem } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {getCampaignsCount} from "../shared/apis/campaignsApi";
import CampaignPreviewCard from "../shared/components/CampaignPreviewCard";

export default function Main() {
    const orders = ["topRated", "lastUpdated"];
    const campaignsPerPage = 10;
    const [page, setPage]= useState(1);
    const [order, setOrder]= useState(orders[0]);
    const [pagesCount, setPagesCount]= useState(1);
    const [campaigns, setCampaigns]= useState([]);


    const getPagesCount = () => {
        getCampaignsCount().then(campaignsCount => {
            if(campaignsCount)
                setPagesCount(campaignsCount / campaignsPerPage);
            else
            console.log("error");
        });
    }
    useEffect(getPagesCount, [])

    const getCampaignsPage = useCallback((page, count, order) => {
        getCampaignsPage(page, count, order).then(campaigns => {
            if(campaigns)
                setCampaigns(campaigns);
            else
                console.log("error");            
        });
    }, [])
    //useEffect(getCampaignsPage, [getCampaignsPage]);

    const onPageChange = useCallback((event, newPage) => {
        getCampaignsPage(page, campaignsPerPage, order)
        setPage(newPage);
    }, [getCampaignsPage, order, page]);

    const onOrderChange = useCallback((event) => {
        const newOrder = event.target.value;
        setOrder(newOrder);
        setPage(1);
        getCampaignsPage(1, campaignsPerPage, newOrder);
    }, [getCampaignsPage]);


    return (
        <>
            <h3><FormattedMessage id="main.header"></FormattedMessage></h3>
            <Select
                required
                value={order}
                onChange={onOrderChange}
            >
                {orders.map(order => 
                    <MenuItem key={order} value={order}>
                        <FormattedMessage id={`orders.${order}`}>
                    </FormattedMessage></MenuItem>
                )}
            </Select>
            <Pagination count={pagesCount} page={page} onChange={onPageChange} />
            {campaigns.map(campaign => 
                <CampaignPreviewCard campaign={campaign}/>
            )}
            <Pagination count={pagesCount} page={page} onChange={onPageChange} />
        </>
    )
}