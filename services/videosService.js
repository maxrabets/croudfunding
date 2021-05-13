const Video = require("../models/Video");

async function updateVideo(campaign, video) {
    if(!video){
        return;
    }
    const oldVideo = await campaign.getVideo();
    if(!oldVideo){
        return await campaign.addVideo(video);
    }
    oldVideo.filename = video.filename;
    await oldVideo.save();
}

exports.updateVideo = updateVideo;