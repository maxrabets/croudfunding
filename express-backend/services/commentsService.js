const Campaign = require("../models/Campaign");
const Comment = require("../models/Comment");

async function getComments(campaignId) {
    let campaign = await Campaign.findOne({
        where: {id: campaignId}});
    if(!campaign)
        return false;
    let comments = await campaign.getComments();
    return comments;
}

async function createComment(userId, campaignId, text) {
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(!campaign)        
        return false;
    return await Comment.create({text, userId, campaignId});
};

exports.getComments = getComments;
exports.createComment = createComment;