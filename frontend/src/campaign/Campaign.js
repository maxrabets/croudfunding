import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage, FormattedDate} from "react-intl";
import { Typography, Button, Box, Divider,
    CircularProgress, InputLabel } from '@material-ui/core';
import ReactPlayer from 'react-player/youtube';
import ReactMarkdown from 'react-markdown';
import ProgressBar from "../shared/components/ProgressBar";
import BonusesList from "../shared/components/bonuses/BonusesList";
import PaymentDialog from "../shared/components/dialogs/PaymentDialog";
import RatingDialog from "../shared/components/dialogs/RatingDialog";
import ImagesGallery from "../shared/components/images/ImagesGallery";
import NewsPost from "../shared/components/news/NewsPost";
import CommentsField from "../shared/components/comments/CommentsField";
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
    <Box m={2}>
        <Typography variant="h5" color="secondary">{campaign.name}</Typography>
        <Box my={2}>
            <Rating value={campaign.averageRating} readOnly precision={0.1}/>
            <Button variant="contained"  color="primary" onClick={onRate} 
                disabled={!isAuthenticated}> 
                <FormattedMessage id="campaigns.ratings.rate" />
            </Button>
        </Box>
        <Box my={2}>
            <Typography>
                <FormattedMessage id="campaigns.status" />: {campaign.status}
            </Typography>
        </Box>
        {isYouTubeLink ? <ReactPlayer width="100%"
                url={campaign.videoLink}
            /> : <></>}
        <Box mt={6} mb={10}>
            <Typography>
                <ReactMarkdown >{campaign.description}</ReactMarkdown>
            </Typography>            
            <Divider />
        </Box>
        <Typography >
            <FormattedMessage id="campaigns.money.summary" />:
            <ProgressBar now={campaign.currentMoney} target={campaign.targetMoney} />
        </Typography>
        <Box my={2}>
            <Typography>
                <FormattedMessage id="campaigns.startDate" />: 
                <FormattedDate value={campaign.creationDate} />
            </Typography>
            <Typography>
                <FormattedMessage id="campaigns.endDate" />: 
                <FormattedDate value={campaign.endDate} />
            </Typography>
        </Box>
        <Typography>
            <FormattedMessage id="campaigns.category" />: {campaign.category}
        </Typography>
        <Box my={2}>
            <InputLabel id="tags-label">
                <FormattedMessage id="campaigns.tags" />
            </InputLabel>
            <Tags
                value={campaign.tags}
                readOnly
            />
        </Box>
        { campaign.images.length > 0 ?
            <Box my={2}>
                <Typography><FormattedMessage id="campaigns.images" /></Typography>
                <ImagesGallery images={campaign.images}/>
            </Box> : <></>
        }
        
        <Box my={4}>
            <Typography>
                <FormattedMessage id="campaigns.bonuses" />
            </Typography>
            <BonusesList bonuses={campaign.bonuses} onPay={onPay} 
                disabled={!isAuthenticated || campaign.status !== "active" }/>
            <Box m={2}>
                <Button variant="contained"  color="primary" onClick={() => onPay()}
                    disabled={!isAuthenticated || campaign.status !== "active" }>
                    <FormattedMessage id="campaigns.pay" />
                </Button>
            </Box>
        </Box>
        
        <CommentsField campaignId={campaign.id}/> 

        { campaign.images.length > 0 ?
            <Box my={4}>
                <Typography><FormattedMessage id="campaigns.news" /></Typography>
                {news.map(post => <NewsPost post={post} />)}
            </Box> : <></>
        }
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
    </ Box>
    );
};

export default Campaign;
