const cloudService = require('../services/cloudService');
const campaignsService = require('../services/campaignsService');
const usersService = require('../services/usersService');
const categoriesService = require('../services/categoriesService');


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
    
    const user = await usersService.findOrCreate(userId);
    const category = await categoriesService.findOne(categoryName);
    const campaign = await campaignsService.createCampaign(user, category, name, description, 
        video, targetMoney, endDate, images, bonuses, tags);
    if(campaign)
        response.sendStatus(200);
    else
        response.sendStatus(500);
};

exports.getUserCampaigns = async function(request, response){
    const userId = request.query.userId;
    const user = await usersService.findOrCreate(userId);
    const userCampaigns = await campaignsService.getUserCampaigns(user);
    if(userCampaigns)
        response.json(userCampaigns);
    else
        response.sendStatus(500);
};

exports.getCampaign = async function(request, response){
    const campaignId = request.params.campaignId;
    let campaign = await campaignsService.getCampaign(campaignId);
    if(!campaign)
        return response.sendStatus(404);
    else
        response.json(campaign);
};

exports.deleteCampaign = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    const camapaign = await campaignsService.deleteCampaign(campaignId, userId);
    if(camapaign)
        return response.sendStatus(200);
    else
        return response.sendStatus(404);
};

exports.editCampaign = async function(request, response) {
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;    
    const filenames = await cloudService.saveFiles(request.files);        
    const images = filenames.map(filename => {return {filename}});
    const bonuses = JSON.parse(request.body.bonuses);
    const categoryName = request.body.category;
    const tags = request.body.tags.split(',').map(name => {return {name}}); 
    const name = request.body.name;
    const targetMoney = request.body.targetMoney;
    const endDate = request.body.endDate;
    const description = request.body.description;
    const video = {filename: request.body.videoLink};

    let campaign = await campaignsService.editCampaign(userId, campaignId, categoryName, 
        name, targetMoney, endDate, description, video, images, bonuses, tags);
    if(campaign)
        return response.sendStatus(200);
    else
        return response.sendStatus(404);
};