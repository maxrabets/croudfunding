const cloudService = require('../services/cloudService');
const usersService = require('../services/usersService')
const User = require("../models/User");

exports.createCampaign = async function (request, response){
    const filesNames = await cloudService.saveFiles(request.files);
    const userId = request.user.sub;
    let campaign = request.body;
    campaign.userId = userId;
    campaign.images = filesNames.join();
    const bonuses = campaign.bonuses
    //delete campaign.bonuses;
    console.log(campaign);
    console.log("bonuses" + bonuses);
    campaign = await Campaign.create(campaign);
    bonuses.forEach(bonus => {
        campaign.createBonus(bonus);
    });
    // const buffers = await cloudService.getFiles(names);
    // const encodedFiles = buffers.map(buffer => buffer.toString('base64'));
    response.sendStatus(200);
};

exports.registerUser = async function(request, response){
    const userId = request.user.sub;
    const [user, created] = await User.findOrCreate({id: userId});
    response.send(created);
};

exports.getUserBonuses = async function(request, response){
    const userId = request.params.userId;
    const bonuses = await usersService.getUserBonuses(userId);
    if(bonuses)
        response.json(bonuses);
    else
        response.sendStatus(400);
};

exports.getUser = async function(request, response){
    const userId = request.params.userId;
    const user = await usersService.getProfile(userId);
    if(user)
        response.json(user);
    else
        response.sendStatus(400);
};