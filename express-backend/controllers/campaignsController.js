const cloudService = require('../services/cloudService');
const campaignsService = require('../services/campaignsService');
const Campaign = require("../models/Campaign");
const Category = require("../models/Category");
const Bonus = require("../models/Bonus");
const User = require("../models/User");
const Image = require("../models/Image");
const Tag = require("../models/Tag");
const Video = require("../models/Video");
const News = require("../models/News");
const fs = require("fs");

exports.createCampaign = async function (request, response) {    
    const userId = request.user.sub;
    
    const filenames = await cloudService.saveFiles(request.files);
    const bonuses = JSON.parse(request.body.bonuses);
    const categoryName = request.body.category;
    const tags = request.body.tags.split(',').map(name => {return {name}}); 
    const name = request.body.name;
    const targetMoney = request.body.targetMoney;
    const endDate = request.body.endDate;
    const description = request.body.description;
    const video = {filename: request.body.videoLink};
    const images = filenames.map(filename => {return {filename}});
    console.log(request.body); 
    console.log(request.files); 

    const [user, created] = await User.findOrCreate({ where: {id: userId}});
    const category = await Category.findOne({where: {name: categoryName}});
    console.log(category);
    if(!category) {
        return response.status(400).send("Bad category");
    } 
    const campaign = await Campaign.create({
        name: name,
        description: description,
        targetMoney: targetMoney,
        endDate: endDate,
        userId: user.id,
        categoryId: category.id,    
        images: images,
        bonuses: bonuses,
        video: video,
    }, {
        include: [Image, Bonus, Video]
    });
    for(let i = 0; i < tags.length; i++) {    
        const [tagFromDb, created] = await Tag.findOrCreate({where: {name: tags[i].name}});
        console.log(tagFromDb);
        await tagFromDb.addCampaign(campaign);
    } 


    // const buffers = await cloudService.getFiles(names);
    // const encodedFiles = buffers.map(buffer => buffer.toString('base64'));
    response.sendStatus(200);
};

exports.getCategories = async function(request, response){
    const categories = await Category.findAll({raw:true});
    const namesOfCategories = categories.map(category => category.name);
    response.json(namesOfCategories);
};

exports.getUserCampaigns = async function(request, response){
    const userId = request.query.userId;
    const [user, created] = await User.findOrCreate({ where: {id: userId}});
    const userCampaigns = await user.getCampaigns({include: {
        model: Category,
        as: "category"
    }});
    response.json(userCampaigns);
};

exports.getCampaign = async function(request, response){
    const campaignId = request.params.campaignId;
    let campaign = await Campaign.findOne({
        where: {id: campaignId},
        include: [ 
            {
                model: Category,
                as: "category"
            },
            User, Bonus, Rating, Image, Video, Tag
        ]
    });
    let images = await campaign.getImages();
    images = await cloudService.getFiles(images.map(image => image.filename));
    campaign = campaign.toJSON();
    campaign.images = images;
    campaign.videoLink = campaign.video.filename;
    // const encodedFiles = buffers.map(buffer => buffer.toString('base64'));
    response.json(campaign);
};

exports.deleteCampaign = async function(request, response){
    const userId = request.user.sub;
    const id = request.params.campaignId;
    let campaign = await Campaign.findOne({where: {id: id}});
    if(campaign.userId == userId) { 
        const tags = await campaign.getTags();
        const images = await campaign.getImages();
        cloudService.deleteFiles(images.map(image => image.filename));
        await campaign.destroy();
        for(let i = 0; i < tags.length; i++) {    
            const campaigns = await tags[i].getCampaigns();
            if(campaigns.length == 0) {
                await tags[i].destroy();
            }
        } 
        return response.sendStatus(200);
    }
    else
        return response.sendStatus(404);
};


async function addImageToPost(post) {    
    let image = post.image;
    image = await cloudService.getFile(post.image);
    post = post.toJSON();
    post.image = image;
    return post;
}

exports.getCampaignNews = async function(request, response){
    const campaignId = request.params.campaignId;
    let campaign = await Campaign.findOne({
        where: {id: campaignId}});
    let news = await campaign.getNews();
    news = await Promise.all(news.map(async post => 
        await addImageToPost(post)
    ))
    console.log(news)
    response.send(news);
};

exports.createPost = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    let post = request.body;
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(!campaign)        
        return response.sendStatus(404);
    if(campaign.userId == userId) { 
        post.image = await cloudService.saveFile(request.file);
        post.campaignId = campaignId;
        post = await News.create(post);
        post = await addImageToPost(post);
        return response.send(post);
    }
    else
        return response.sendStatus(404);
};

exports.changePost = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    const postId = request.params.postId;//здесь
    let post = request.body;
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(campaign.userId == userId) { 
        let news = await campaign.getNews({where: {id: postId}});
        if(news.legth != 1)
            return response.sendStatus(500);
        else {
            post.image = await cloudService.saveFile(request.file);
            news[0].header = post.header;
            news[0].description = post.description;
            news[0].image = post.image;
            news[0].lastModificationDate = Date.now();
            post = await news[0].save();
            post = await addImageToPost(post);
            return response.send(post);
        }
    }
    else
        return response.sendStatus(404);
};

exports.deletePost = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    const postId = request.params.postId;
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(campaign.userId == userId) { 
        let news = await campaign.getNews({where: {id: postId}});
        if(news.legth != 1)
            return response.sendStatus(500);
        else {
            const post = await news[0].destroy();
            return response.sendStatus(200);
        }
    }
    else
        return response.sendStatus(404);
};