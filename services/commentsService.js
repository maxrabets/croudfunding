const Campaign = require("../models/Campaign");
const Comment = require("../models/Comment");
const usersService = require("./usersService")

async function addProfile(comment){
    comment = comment.toJSON();
    comment.user = await usersService.getProfile(comment.userId);
    return comment;
}

async function getComments(campaignId) {
    let campaign = await Campaign.findOne({
        where: {id: campaignId}});
    if(!campaign)
        return false;
    let comments = await campaign.getComments({
        order: [
            ["creationDate", "ASC"]
        ]
    });
    comments = await Promise.all(comments.map(async comment => 
        await addProfile(comment)
    ))
    console.log(comments);
    return comments;
}

async function createComment(userId, campaignId, text) {
    let campaign = await Campaign.findOne({where: {id: campaignId}});
    if(!campaign)        
        return false;
    const comment = await Comment.create({text, userId, campaignId});
    return await addProfile(comment);
};

exports.getComments = getComments;
exports.createComment = createComment;