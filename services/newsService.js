const News = require("../models/News");
const Campaign = require("../models/Campaign");
const cloudService = require('../services/cloudService');

async function addImageToPost(post) {    
    let image = post.image;
    image = await cloudService.getFile(post.image);
    post = post.toJSON();
    post.image = image;
    return post;
}

async function getNews(campaignId) {
    let news = await News.findAll({
        where: {
            campaignId
        },
        order: [
            ["creationDate", "DESC"]
        ],
    });
    news = await Promise.all(news.map(async post => 
        await addImageToPost(post)
    ))
    return news;
}

async function createPost(userId, campaignId, post, image) {
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(!campaign)        
        return false;
    if(campaign.status !== "active")
        return post;
    if(campaign.userId == userId) { 
        post.image = await cloudService.saveFile(image);
        post.campaignId = campaignId;
        post = await News.create(post);
        post = await addImageToPost(post);
        campaign.lastModificationDate = Date.now();
        campaign.save();
        return post;
    }
    else
        return false;
};

async function changePost(userId, campaignId, postId, post, image) {
    let campaign = await Campaign.findOne({where: {id: campaignId}});    
    if(!campaign)        
        return false;
    if(campaign.status !== "active")
        return post;
    if(campaign.userId == userId) { 
        let news = await campaign.getNews({where: {id: postId}});
        if(news.length != 1)
            return false;
        else {            
            news[0].header = post.header;
            news[0].description = post.description;
            console.log(image)
            if(image) {
                post.image = await cloudService.saveFile(image);
                news[0].image = post.image;
            }
            else {
                news[0].image = null;
            }
            post = await news[0].save();
            post = await addImageToPost(post);
            campaign.lastModificationDate = Date.now();
            campaign.save();
            return post;
        }
    }
    else
        return false;
};

async function deletePost(userId, campaignId, postId){
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(!campaign)        
        return false;
    if(campaign.status !== "active")
        return false;
    if(campaign.userId == userId) { 
        let news = await campaign.getNews({where: {id: postId}});
        if(news.length != 1)
            return false;
        else {
            const post = await news[0].destroy();
            campaign.lastModificationDate = Date.now();
            campaign.save();
            return true;
        }
    }
    else
        return false;
};


exports.getNews = getNews;
exports.createPost = createPost;
exports.changePost = changePost;
exports.deletePost = deletePost;