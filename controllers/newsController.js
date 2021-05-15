const newsService = require('../services/newsService');

exports.getCampaignNews = async function(request, response){
    const campaignId = request.params.campaignId;
    const news = await newsService.getNews(campaignId);
    if(news)
        return response.send(news);
    else
        return response.sendStatus(400);
};

exports.createPost = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    let post = request.body;
    post = await newsService.createPost(userId, campaignId, post, request.file);
    if(post)
        return response.send(post);
    else
        return response.sendStatus(400);
};

exports.changePost = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    const postId = request.params.postId;
    const image = request.file;
    let post = request.body;
    post = await newsService.changePost(userId, campaignId, postId, post, image);
    if(post)
        response.send(post);
    else
        response.sendStatus(400);
};

exports.deletePost = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    const postId = request.params.postId;
    const result = await newsService.deletePost(userId, campaignId, postId);
    if(result)
        return response.sendStatus(200);
    else
    return response.sendStatus(400);
};