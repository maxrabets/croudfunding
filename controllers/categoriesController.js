const categoriesService = require("../services/categoriesService");

exports.getCategories = async function(request, response){
    const categories = await categoriesService.getCategories();
    const namesOfCategories = categories.map(category => category.name);//!!
    response.json(namesOfCategories);
};