import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
import { Typography, Breadcrumbs, Button, Box, Link as MaterialUILink,
    CircularProgress, DialogContent, Dialog } from '@material-ui/core';
import NewsForm from "../shared/components/news/NewsPostForm";
import NewsEditCard from "../shared/components/news/NewsEditCard";
import {getNews as getNewsFromApi, createPost, deletePost, 
    changePost} from "../shared/apis/newsApi";

const CampaignsCreateMenu = (props) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ addFormOpen, setAddFormOpen] = useState(false);
    const [ editFormOpen, setEditFormOpen] = useState(false);
    const [ currentPost, setCurrentPost] = useState();
    const [news, setNews] = useState([]);
    const emptyPost = {header: "", description: ""};

    const getNews = useCallback(() => {
        getNewsFromApi(props.match.params.id).then(newsFromApi => {
            if(newsFromApi) {
                setNews(newsFromApi);
                setIsLoaded(true);
            }
            else
                console.log('error')
        })
    }, [props.match.params.id])

    const onAdd = useCallback(async (formData) => {
        const token = await getAccessTokenSilently();
        createPost(props.match.params.id, formData, token)
        .then(addedPost => {
            setAddFormOpen(false);
            if(addedPost) {                 
                    setNews([addedPost].concat(news));
            }
            else {
                alert("error");
            }
        });
    }, [getAccessTokenSilently, news, props.match.params.id]);

    const onClose = useCallback(async (id) => {
        const token = await getAccessTokenSilently();
        deletePost(props.match.params.id, id, token).then(deleted => {
            if(deleted){
                console.log("delete");
                const newsCopy = news.slice();                
                const index = newsCopy.findIndex(post => post.id === id);
                console.log(index)
                newsCopy.splice(index, 1);
                setNews(newsCopy);
            }            
            else
                alert("error");
        })
    }, [getAccessTokenSilently, news, props.match.params.id]);

    const onEdit = useCallback((post) => {
        setCurrentPost(post);
        setEditFormOpen(true);
    }, []);

    const onChange = useCallback(async (formData, id) => {
        const token = await getAccessTokenSilently();
        changePost(props.match.params.id, id, formData, token).then(changed => {            
            setEditFormOpen(false);
            if(changed) {
                getNews();
            }
            else
                alert("error");
        })
    }, [getAccessTokenSilently, getNews, props.match.params.id]);

    useEffect(getNews, [getNews]);

    if(!isLoaded)
        return <CircularProgress />;

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
                <MaterialUILink color="secondary" component={NavLink}
                    to={`/profile/campaigns/${props.match.params.id}`}
                >
                    <FormattedMessage id="links.updateCampaign" />
                </MaterialUILink>
                <Typography color="textPrimary">
                    <FormattedMessage id="campaigns.news" />
                </Typography>
            </Breadcrumbs>

            <Box my={2}>
                <Button  color="primary" variant="contained" 
                    onClick={() => setAddFormOpen(true)}
                >
                    <FormattedMessage id="campaigns.news.add" />
                </Button>
            </Box>
            <Box my={2}>
                {news.map(post => 
                    <NewsEditCard key={post.id} post={post}
                        onEdit={() => onEdit(post)} 
                        onClose={() => onClose(post.id)}
                    />
                )}
            </Box>

            <Dialog
                open={addFormOpen}
                onClose={() => setAddFormOpen(false)}
            >
                <DialogContent>
                    <NewsForm defaultPost={emptyPost} onSave={onAdd}/>
                </DialogContent>
            </Dialog>
            <Dialog
                open={editFormOpen}
                onClose={() => setEditFormOpen(false)}
            >
                <DialogContent>
                    <NewsForm defaultPost={currentPost} onSave={onChange}/>
                </DialogContent>
            </Dialog>
        </Box>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
