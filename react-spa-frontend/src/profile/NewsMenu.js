import React, {useCallback, useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
import { Typography, Breadcrumbs, Button, 
    CircularProgress, DialogContent, Dialog } from '@material-ui/core';
import NewsForm from "../shared/components/campaignForm/news/NewsPostForm";
import NewsEditCard from "../shared/components/campaignForm/news/NewsEditCard";

const CampaignsCreateMenu = (props) => {
    const { isAuthenticated } = useAuth0();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ addFormOpen, setAddFormOpen] = useState(false);
    const [ editFormOpen, setEditFormOpen] = useState(false);
    const [ currentPost, setCurrentPost] = useState();
    const { getAccessTokenSilently } = useAuth0();
    const [news, setNews] = useState([]);
    console.log(props.match.params.id);
    const emptyPost = {header: "", description: ""};

    const getNews = () => {
        //setIsLoaded(false);
        fetch(`/campaigns/${props.match.params.id}/news`).then( response => {
            if(response.ok){
                response.json().then(news => {
                    setNews(news);
                    setIsLoaded(true);
                });
            }
            else{
                console.log(response);
            }
        })
    }

    const onAdd = useCallback(async (formData) => {
        const token = await getAccessTokenSilently();
        fetch(`/campaigns/${props.match.params.id}/news`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }).then(response => {
            setAddFormOpen(false);
            console.log(response);
            if(response.ok) {
                response.json(addedNews => {
                    setNews(news.concat(addedNews));
                });
            }
            else
                alert("error");
        });
    }, [getAccessTokenSilently, news, props.match.params.id]);

    const onClose = useCallback(async (id) => {
        const token = await getAccessTokenSilently();
        fetch(`/campaigns/${props.match.params.id}/news/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            console.log(response);
            if(response.ok) {
                const newsCopy = news.slice();
                const index = newsCopy.find(post => post.id = id);
                newsCopy.splice(index, 1);
            }
            else
                alert("error");
        });
    }, [getAccessTokenSilently, news, props.match.params.id]);

    const onEdit = useCallback((post) => {
        setCurrentPost(post);
        setEditFormOpen(true);
    }, []);

    const onChange = useCallback(async (formData, id) => {
        const token = await getAccessTokenSilently();
        fetch(`/campaigns/${props.match.params.id}/news/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }).then(response => {
            setEditFormOpen(false);
            console.log(response);
            if(response.ok) {
                getNews();
            }
            else
                alert("error");
        });
    }, [getAccessTokenSilently, getNews, props.match.params.id]);

    useEffect(getNews, [props.match.params.id, setIsLoaded]);

    if(!isLoaded)
        return <CircularProgress />;

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
                <NavLink color="inherit" 
                    to={`/profile/campaigns/${props.match.params.id}`}
                >
                    <FormattedMessage id="links.updateCampaign" />
                </NavLink>
                <Typography color="textPrimary">
                    <FormattedMessage id="campaigns.news" />
                </Typography>
            </Breadcrumbs>

            <Button  color="primary" variant="contained" 
                onClick={() => setAddFormOpen(true)}
            >
                <FormattedMessage id="campaigns.news.add" />
            </Button>
            {news.map(post => 
                <NewsEditCard header={post.header} description={post.description}
                    image={post.image} 
                    onEdit={() => onEdit(post)} 
                    onClose={() => onClose(post.id)}
                />
            )}
            <Dialog
                open={addFormOpen}
                onClose={() => setAddFormOpen(false)}
            >
                <DialogContent>
                    <NewsForm defaultNews={emptyPost} onSave={onAdd}/>
                </DialogContent>
            </Dialog>
            <Dialog
                open={editFormOpen}
                onClose={() => setEditFormOpen(false)}
            >
                <DialogContent>
                    <NewsForm defaultNews={currentPost} onSave={onChange}/>
                </DialogContent>
            </Dialog>
        </>
        );
    }
    return <></>
};

export default CampaignsCreateMenu;
