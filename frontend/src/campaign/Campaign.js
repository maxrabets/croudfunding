import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import { Typography, Button, 
    CircularProgress, InputLabel } from '@material-ui/core';
import ReactPlayer from 'react-player/youtube';
import ReactMarkdown from 'react-markdown';
import ProgressBar from "../shared/components/ProgressBar";
import BonusesList from "../shared/components/BonusesList";
import PaymentDialog from "../shared/components/PaymentDialog";
import RatingDialog from "../shared/components/RatingDialog";
import ImagesGallery from "../shared/components/ImagesGallery";
import NewsPost from "../shared/components/news/NewsPost";
import CommentsField from "../shared/components/CommentsField";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import Rating from '@material-ui/lab/Rating';
import cloneDeep from 'lodash/cloneDeep';
import {matchYoutubeUrl} from "../shared/validators/VideoLinkValidator";
import {getNews as getNewsFromApi} from "../shared/apis/newsApi";
import {getCampaign as getCampaignFromApi} from "../shared/apis/campaignsApi";

const Campaign = (props) => {
    const { isAuthenticated } = useAuth0();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [campaign, setCamapign] = useState({});
    const [news, setNews] = useState([]);
    const [isYouTubeLink, setIsYouTubeLink] = useState(false);
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
    const [defaultPaymentSum, setDefaultPaymentSum] = useState(0);

    const getNews = () => {
        getNewsFromApi(props.match.params.id).then(newsFromApi => {
            if(newsFromApi)
                setNews(newsFromApi);
            else
                console.log('error')
        })
    }

    const getCampaign = () => {
        getCampaignFromApi(props.match.params.id).then(campaign => { 
            if(campaign){                    
                setCamapign(campaign);
                setIsYouTubeLink(matchYoutubeUrl(campaign.videoLink));              
                setIsLoaded(true);
            }
            else
                console.log('error')
        })
    }
    useEffect(getCampaign, [props.match.params.id, setIsLoaded]);
    useEffect(getNews, [props.match.params.id, setIsLoaded]);

    const onPay = useCallback((bonus) => {
        if(isAuthenticated) {
            if(bonus)
                setDefaultPaymentSum(bonus.price);
            else
                setDefaultPaymentSum(0);
            setIsPaymentDialogOpen(true);
        }
    }, [isAuthenticated]);

    const onRate = useCallback(() => {
        if(isAuthenticated) {
            setIsRatingDialogOpen(true);
        }
    }, [isAuthenticated]);

    if(!isLoaded)
        return <CircularProgress />;
    
    return (
    <>
        <Typography variant="h3">{campaign.name}</Typography>
        <Rating value={campaign.averageRating} readOnly precision={0.1}/>
        <Button variant="contained"  color="primary" onClick={onRate}>
            <FormattedMessage id="campaigns.ratings.rate" />
        </Button>
        {isYouTubeLink ? <ReactPlayer
                url={campaign.videoLink}
            /> : <></>}
        <ReactMarkdown>{campaign.description}</ReactMarkdown>
        <ProgressBar now={campaign.currentMoney} target={campaign.targetMoney} />
        <Typography>
            <FormattedMessage id="campaigns.startDate" />: {campaign.creationDate.toString()}
        </Typography>
        <Typography>
            <FormattedMessage id="campaigns.endDate" />: {campaign.endDate.toString()}
        </Typography>
        <Typography>
            <FormattedMessage id="campaigns.category" />: {campaign.category}
        </Typography>
        <InputLabel id="tags-label">
            <FormattedMessage id="campaigns.tags" />
        </InputLabel>
        <Tags
            value={campaign.tags}
            readOnly
        />
        <Typography><FormattedMessage id="campaigns.images" /></Typography>
        <ImagesGallery images={campaign.images}/>
        
        <BonusesList bonuses={campaign.bonuses} onPay={onPay}/>        
        <Button variant="contained"  color="primary" onClick={() => onPay()}>
            <FormattedMessage id="campaigns.pay" />
        </Button>
        
        <CommentsField campaignId={campaign.id}/> 

        <Typography><FormattedMessage id="campaigns.news" /></Typography>
        {news.map(post => <NewsPost post={post} />)}

        <PaymentDialog campaign={campaign} 
            isOpen={isPaymentDialogOpen}
            onClose={(campaignCurrentMoney) => {
                setIsPaymentDialogOpen(false);
                console.log(campaignCurrentMoney)
                if(campaignCurrentMoney) {
                    const newCampaign = cloneDeep(campaign);
                    newCampaign.currentMoney = campaignCurrentMoney;
                    setCamapign(newCampaign)
                }
            }} 
            defaultSum={defaultPaymentSum}
        />
        <RatingDialog 
            campaignId={campaign.id} 
            isOpen={isRatingDialogOpen}
            onClose={(avgRating) => {
                setIsRatingDialogOpen(false);
                console.log(avgRating)
                if(avgRating) {
                    const newCampaign = cloneDeep(campaign);
                    newCampaign.averageRating = avgRating;
                    setCamapign(newCampaign)
                }
            }} 
        />
    </>
    );
};

export default Campaign;
