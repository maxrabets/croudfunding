const Tag = require("../models/Tag");

async function checkTags(tags) {
    for(let i = 0; i < tags.length; i++) {    
        const campaigns = await tags[i].getCampaigns();
        if(campaigns.length == 0) {
            await tags[i].destroy();
        }
    } 
}

async function updateTags(campaign, tags) {
    const oldTags = await campaign.getTags();
    console.log(oldTags);
    for(let i = 0; i < oldTags.length; i++) {
        await campaign.removeTag(oldTags[i]);
    }
    for(let i = 0; i < tags.length; i++) {    
        const [tagFromDb, created] = await Tag.findOrCreate({where: {name: tags[i].name}});
        await tagFromDb.addCampaign(campaign);
    } 
    checkTags(oldTags);
}

async function findOrCreate(name) {
    const [tagFromDb, created] = await Tag.findOrCreate({where: {name: name}});
    return tagFromDb;
}

exports.checkTags = checkTags;
exports.findOrCreate = findOrCreate;
exports.updateTags = updateTags;