const reactionsService = require('../services/reactionsService');

exports.getCommentReactions = async function(request, response){
    const commentId = request.params.commentId;
    const reactions = await reactionsService.getCommentReactions(commentId);
    if(reactions) {        
        const reactionTypesCount = await reactionsService.countReactions(reactions);
        console.log(JSON.stringify([...reactionTypesCount]));
        return response.json(JSON.stringify([...reactionTypesCount]));
    }
    else
        return response.sendStatus(400);
};

exports.createReaction = async function(request, response){
    const userId = request.user.sub;
    const commentId = request.params.commentId;
    let reactionType = request.body.reactionType;
    const created = await reactionsService.createReaction(userId, commentId, reactionType);
    if(created)
        return response.sendStatus(200);
    else
        return response.sendStatus(400);
};