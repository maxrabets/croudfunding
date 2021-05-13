const Category = require("../models/Category");

async function getCategories() {
    const categories = await Category.findAll({raw:true});
    return categories;
}

async function findOne(name) {
    return category = await Category.findOne({where: {name: name}});
}

exports.findOne = findOne;
exports.getCategories = getCategories;