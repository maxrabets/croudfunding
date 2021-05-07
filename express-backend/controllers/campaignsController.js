const cloudService = require('../services/cloudService')

exports.createCampaign = async function (request, response, next){
    const names = await cloudService.saveFiles(request.files);
    const buffers = await cloudService.getFiles(names);
    // const encodedFiles = buffers.map(buffer => buffer.toString('base64'));
    // response.send(encodedFiles);
};

exports.updateCampaign = function(request, response){
    response.send("Список пользователей");
};