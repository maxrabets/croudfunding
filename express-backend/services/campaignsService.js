const Campaign = require("../models/Campaign");
const Image = require("../models/Image");
const Bonus = require("../models/Bonus");
const Video = require("../models/Video");
const Rating = require("../models/Rating");
const Tag = require("../models/Tag");
const usersService = require("../services/usersService");
const tagsService = require("../services/tagsService");
const cloudService = require('../services/cloudService');
const categoriesService = require('../services/categoriesService');
const videosService = require('../services/videosService');
const imagesService = require('../services/imagesService');
const bonusesService = require('../services/bonusesService');

async function getUserCampaigns(user) {
    if(!user)
        return false;
    const userCampaigns = await user.getCampaigns({include: {
        model: Category,
        as: "category"
    }});
    return userCampaigns;
}

async function getCampaign(campaignId) {
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
    if(!campaign)
        return response.sendStatus(404);
    let images = await campaign.getImages();
    images = await cloudService.getFiles(images.map(image => image.filename));
    campaign = campaign.toJSON();
    campaign.images = images;
    campaign.videoLink = "";
    if(campaign.video)
        campaign.videoLink = campaign.video.filename;
    return campaign;
}

async function deleteCampaign(campaignId, userId) {
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    
    if(campaign.userId == userId) { 
        const tags = await campaign.getTags();
        const images = await campaign.getImages();
        cloudService.deleteFiles(images.map(image => image.filename));
        await campaign.destroy();
        await checkTags(tags);
        return campaign;
    }
    else
        return false    
}

async function createCampaign(user, category, name, description, video,
        targetMoney, endDate, images, bonuses, tags) {
    if(!category) {
        return false;
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
        const tagFromDb = await tagsService.findOrCreate(tags[i].name);
        await tagFromDb.addCampaign(campaign);
    } 
    return campaign;
};

async function editCampaign(userId, campaignId, categoryName, name, targetMoney, endDate,
     description, video, images, bonuses, tags) {
    let campaign = await Campaign.findOne({where: {id: campaignId}, include: {all: true}});    
    if(!campaign)        
        return false;
    if(campaign.userId == userId) { 
        const category = await categoriesService.findOne(categoryName);
        if(!category) {
            return false;
        }
        campaign.categoryId = category.id;
        campaign.name = name;
        campaign.targetMoney = targetMoney;
        campaign.endDate = endDate;
        campaign.description = description;
        await videosService.updateVideo(campaign, video);    
        await imagesService.updateImages(campaign, images)
        await bonusesService.updateBonuses(campaign, bonuses);      
        await tagsService.updateTags(campaign, tags);
        campaign.lastModificationDate = Date.now();
        campaign.save();

        return campaign;
    }
    else
        return false;
};

exports.getUserCampaigns = getUserCampaigns;
exports.getCampaign = getCampaign;
exports.deleteCampaign = deleteCampaign;
exports.createCampaign = createCampaign;
exports.editCampaign = editCampaign;