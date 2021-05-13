import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import {NavLink, Redirect} from "react-router-dom";
import { Typography, Button, 
    CircularProgress, InputLabel } from '@material-ui/core';
import parseISO from "date-fns/parseISO";
import ReactPlayer from 'react-player/youtube';
import ReactMarkdown from 'react-markdown';
import ProgressBar from "../shared/components/ProgressBar";
import BonusesList from "../shared/components/BonusesList";
import PaymentDialog from "../shared/components/PaymentDialog";
import ImagesGallery from "../shared/components/ImagesGallery";
import NewsPost from "../shared/components/news/NewsPost";
import CommentsField from "../shared/components/CommentsField";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

const Campaign = (props) => {
    const { isAuthenticated } = useAuth0();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { getAccessTokenSilently } = useAuth0();
    const [campaign, setCamapign] = useState({});
    const [news, setNews] = useState([]);
    const [isYouTubeLink, setIsYouTubeLink] = useState(false);
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
    const [defaultPaymentSum, setDefaultPaymentSum] = useState(0);

    const convertImageToFile = (image) => {     
        console.log(image);
        if(image) {
            const file = new File([Buffer.from(image.buffer)], image.name);
            file.url = URL.createObjectURL(file);
            return file;
        }
    }

    const getNews = () => {
        fetch(`/campaigns/${props.match.params.id}/news`).then( response => {
            if(response.ok){
                response.json().then(news => {
                    console.log(news)
                    news.forEach(post => post.image = convertImageToFile(post.image))
                    setNews(news);
                });
            }
            else{
                console.log(response);
            }
        })
    }

    const getCampaign = () => {
        fetch(`/campaigns/${props.match.params.id}`).then( response => {
            if(response.ok){
                response.json().then(campaign => {
                    campaign.endDate = parseISO(campaign.endDate);
                    campaign.category = campaign.category.name;
                    campaign.images = campaign.images.map(image => 
                        convertImageToFile(image)
                    )
                    campaign.tags = campaign.tags.map(tag => tag.name);
                    setCamapign(campaign);
                    setIsYouTubeLink(matchYoutubeUrl(campaign.videoLink));              
                    setIsLoaded(true);
                });
            }
            else{
                alert("error");
            }
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
    }, [isAuthenticated])

    if(!isLoaded)
        return <CircularProgress />;
    
    return (
    <>
        <Typography variant="h3">{campaign.name}</Typography>
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
        
        {/* <CommentsField comments={campaign.comments} /> */}

        <Typography><FormattedMessage id="campaigns.news" /></Typography>
        {news.map(post => <NewsPost post={post} />)}
        <PaymentDialog campaign={campaign} 
            isOpen={isPaymentDialogOpen}
            onClose={() => setIsPaymentDialogOpen(false)} 
            defaultSum={defaultPaymentSum}/>
    </>
    );
};

export default Campaign;
