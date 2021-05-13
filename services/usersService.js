const User = require("../models/User");

async function findOrCreate(userId) {
    const [user, created] = await User.findOrCreate({ where: {id: userId}});
    return user;
}

exports.findOrCreate = findOrCreate;