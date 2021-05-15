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
const { Op } = require("sequelize");

async function getCampaignRating(campaign) {
    if(!campaign)
        return false;
    const ratings = await campaign.getRatings();
    const sum = ratings.reduce((sum, current) => sum + current.value, 0);
    console.log(sum);
    return sum / ratings.length;
}

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
        return false
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
        await tagsService.checkTags(tags);
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

async function rateCampaign(campaignId, userId, rating) {
    console.log(campaignId);
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(!campaign)
        return false;
    const user = await usersService.findOrCreate(userId);
    const ratingFromDb = await Rating.findOne({
        where: {campaignId, userId},
    })
    if(ratingFromDb){
        ratingFromDb.value = rating;
        await ratingFromDb.save();
    }
    else{
        await Rating.create({campaignId, userId, value: rating})
    }
    const avgRating = await getCampaignRating(campaign);
    campaign.averageRating = avgRating;
    campaign.save();
    return avgRating;
}

async function getCampaignsCount() {
    return await Campaign.count();
}

async function getPage(pageNumber, count, orderColumn, tags) {
    let where;
    console.log(tags);
    if(!tags || tags == []) {
        where = {}
    }
    // else{
    //     where = {
    //         name: {
    //             [Op.in]: tags
    //         }
    //     }
    // }
    else{
        where = {
            '$tags.name$': tags
        }
    }
    const campaigns = await Campaign.findAll({
        offset: (pageNumber -1) * count,
        limit: count,
        order: [
            [orderColumn, "DESC"]
        ],
        include: [
            Category,
            {
                model: Tag,
                as: "tags",
                //where,
                required: true
            }
        ],        
        where,
    });
    return campaigns;
}

async function getAllTags(){
    return await Tag.findAll();
}

exports.getUserCampaigns = getUserCampaigns;
exports.getCampaign = getCampaign;
exports.deleteCampaign = deleteCampaign;
exports.createCampaign = createCampaign;
exports.editCampaign = editCampaign;
exports.rateCampaign = rateCampaign;
exports.getCampaignsCount = getCampaignsCount;
exports.getPage = getPage;
exports.getAllTags = getAllTags;