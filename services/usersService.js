const managmentClient = require("../auth/managmentClient");
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

async function getProfile(id) {
    if(!id) 
        return false;
    const user = await managmentClient.getUser({ id });
    console.log(user)
    delete user.identities;
    delete user.last_ip;
    delete user.logins_count;
    return(user)
}

exports.findOrCreate = findOrCreate;
exports.getUserBonuses = getUserBonuses;
exports.getUserBonuses = getUserBonuses;
exports.getProfile = getProfile;