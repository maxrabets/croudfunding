const bucket = require('../config/firebaseStorage')

exports.createCampaign = async function (request, response){
    try {
        if (req.file) {            
            const blob = bucket.file(req.file.originalname);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: req.file.mimetype,
                }
            });
            blobWriter.on('error', (err) => next(err));

            blobWriter.on('finish', () => {
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                    bucket.name
                }/o/${encodeURI(blob.name)}?alt=media`;

                // Return the file name and its public URL
                res.status(200)
                    .send({ fileName: req.file.originalname, fileLocation: publicUrl });
            });

            // When there is no more data to be consumed from the stream
            blobWriter.end(req.file.buffer);
        }
    } catch (error) {
        res.status(400).send(
            `Error, could not upload file: ${error}`
        );
        return;
    }
};

exports.updateCampaign = function(request, response){
    response.send("Список пользователей");
};