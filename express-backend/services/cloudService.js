const firebase = require('../config/firebaseStorage');

async function saveFile(file) {    
    if (file) {       
        let url;
        const name = Date.now() + file.originalname;
        const firebaseFile = firebase.bucket.file(name);
        await firebaseFile.save(file.buffer);
        // const signedUrl = await firebaseFile.getSignedUrl();
        // console.log("signed " + signedUrl);
        const publicUrl = firebaseFile.publicUrl();
        console.log("publicUrl " + publicUrl);
        return name;

        // const blobWriter = blob.createWriteStream({
        //     metadata: {
        //         contentType: file.mimetype,
        //     }
        // });

        // blobWriter.on('error', (err) => {
        //     console.log(`Error, could not upload file: ${err}`);
        // });

        // blobWriter.on('finish', () => {
        //     const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        //         firebase.bucket.name}/o/${encodeURI(blob.name)}?alt=media`;                
        //     url = publicUrl;
        //     console.log(url);
        // });

        // // When there is no more data to be consumed from the stream
        // blobWriter.end(file.buffer);
        // console.log(url);
        // return url;
    }    
}

async function saveFiles (files) {
    const names = [];
    for(let i = 0; i < files.length; i++) {
        const name = await saveFile(files[i]);
        if(name){
            names.push(name);
        }
        else
            return false;
    }
    return names;
}

async function getFile(name) {    
    if (name) {
        const firebaseFile = firebase.bucket.file(name);
        const data = await firebaseFile.download();
        console.log(data);
        return data[0];
    }    
}

async function getFiles(names) {    
    const files = [];
    for(let i = 0; i < names.length; i++) {
        const file = await getFile(names[i]);
        if(file){
            files.push(file);
        }
        else
            return false;
    }
    return files;  
}

exports.saveFile = saveFile;
exports.saveFiles = saveFiles;
exports.getFile = getFile;
exports.getFiles = getFiles;