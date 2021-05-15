const User = require("../models/User");

async function findOrCreate(userId) {
    const [user, created] = await User.findOrCreate({ where: {id: userId}});
    return user;
}

async function getUserBonuses(userId) {
    if(!userId) 
        return false
    const [user, created] = await User.findOrCreate({ where: {id: userId}});
    const bonuses = await user.getBonuses();
    return bonuses;
}

exports.findOrCreate = findOrCreate;
exports.getUserBonuses = getUserBonuses;