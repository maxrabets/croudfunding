const cloudService = require('../services/cloudService');
const campaignsService = require('../services/campaignsService');
const Campaign = require("../models/Campaign");
const Category = require("../models/Category");
const Bonus = require("../models/Bonus");
const User = require("../models/User");

exports.createCampaign = async function (request, response) {
    const filenames = await cloudService.saveFiles(request.files);
    const userId = request.user.sub;
    //let campaign = request.body;


    // campaign.userId = userId;
    // campaign.images = filenames.join();


    const bonuses = request.body.bonuses;
    const categoryName = request.body.category;
    const tags = request.body.tags;

    console.log("bonuses" + bonuses);
    console.log("tags" + tags);

    const [user, created] = await User.findOrCreate({ where: {id: userId}});
    const category = await Category.findOne({where: {name: categoryName}});
    console.log(category);
    if(!category) {
        return response.status(400).send("Bad category");
    }
    campaign = await Campaign.create(campaign);   
    





    bonuses.forEach(bonus => {
        campaign.createBonus(bonus);
    });
    filenames.forEach(filename => {
        campaign.createImage({filename});
    });
    tags.forEach(tag => {
        campaign.addTag(tag);
    });
    // const buffers = await cloudService.getFiles(names);
    // const encodedFiles = buffers.map(buffer => buffer.toString('base64'));
    response.sendStatus(200);
};

exports.getCategories = async function(request, response){
    const categories = await Category.findAll({raw:true});
    const namesOfCategories = categories.map(category => category.name);
    response.send(namesOfCategories);
};