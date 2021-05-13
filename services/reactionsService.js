const Campaign = require("../models/Campaign");
const Comment = require("../models/Comment");
const ReactionType = require("../models/ReactionType");
const Reaction = require("../models/Reaction");

async function countReactions(reactions) {
    const reactionTypes = await ReactionType.findAll();
    const reactionTypesCount = new Map();
    reactionTypes.forEach(reactionType => {
        const count = reactions.filter(reaction => reaction.reactionTypeId == reactionType.id).length;
        reactionTypesCount.set(reactionType.name, count);
    });
    return reactionTypesCount;
}

async function getCommentReactions(commentId) {
    const comment = await Comment.findOne({where: {id: commentId}});
    if(!comment)
        return false;
    const reactions = await comment.getReactions();
    console.log(reactions);
    return reactions;
}

async function createReaction(userId, commentId, reactionTypeName) {
    const comment = await Comment.findOne({where: {id: commentId}});
    if(!comment)        
        return false;
    const reactionType = await ReactionType.findOne({where: {name: reactionTypeName}});    
    const [reaction, created] = await Reaction.findOrCreate({
        where: {userId, commentId, reactionTypeId: reactionType.id}
    });
    return created;
};

exports.getCommentReactions = getCommentReactions;
exports.createReaction = createReaction;
exports.countReactions = countReactions;