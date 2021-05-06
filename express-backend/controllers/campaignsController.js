const bucket = require('../config/firebaseStorage');

function saveFile(file) {
    try {
        if (file) {            
            const blob = bucket.file(file.originalname);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                }
            });
            blobWriter.on('error', (err) => next(err));

            blobWriter.on('finish', () => {
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                    bucket.name
                }/o/${encodeURI(blob.name)}?alt=media`;

                return  publicUrl ;
            });

            // When there is no more data to be consumed from the stream
            blobWriter.end(file.buffer);
        }
    } catch (error) {
        console.log(`Error, could not upload file: ${error}`);
        return false;
    }
}

exports.createCampaign = async function (request, response, next){
    console.log(request.files);
    const urls = [];
    request.files.forEach(file => {
        urls.push(saveFile(file));
    });
    console.log(urls);
    response.sendStatus(200)
};

exports.updateCampaign = function(request, response){
    response.send("Список пользователей");
};