const cloudService = require('../services/cloudService');
const campaignsService = require('../services/campaignsService');
const Campaign = require("../models/Campaign");
const Category = require("../models/Category");
const Bonus = require("../models/Bonus");
const User = require("../models/User");
const Image = require("../models/Image");
const Tag = require("../models/Tag");

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
    const video = request.body.video;
    const images = filenames.map(filename => {return {filename}});
    console.log(request.body); 

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
        include: [Image, Bonus]
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
    console.log(userCampaigns);
    response.json(userCampaigns);
};

exports.deleteCampaign = async function(request, response){
    const userId = request.user.sub;
    const id = request.query.id;
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