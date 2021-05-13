const Image = require("../models/Image");
const cloudService = require('../services/cloudService');

async function updateImages(campaign, images) {
    const oldImages = await campaign.getImages();
    cloudService.deleteFiles(oldImages.map(image => image.filename));        
    oldImages.forEach(image => image.destroy())
    
    for(let i = 0; i < images.length; i++) {    
        await campaign.createImage(images[i]);
    }
}

exports.updateImages = updateImages;