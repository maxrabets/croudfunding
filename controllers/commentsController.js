const commentsService = require('../services/commentsService');

exports.getCampaignComments = async function(request, response){
    const campaignId = request.params.campaignId;
    const comments = await commentsService.getComments(campaignId);
    if(comments)
        return response.send(comments);
    else
        return response.sendStatus(400);
};

exports.createComment = async function(request, response){
    const userId = request.user.sub;
    const campaignId = request.params.campaignId;
    let commentText = request.body.commentText;
    comment = await commentsService.createComment(userId, campaignId, commentText);
    if(comment)
        return response.send(comment);
    else
        return response.sendStatus(400);
};