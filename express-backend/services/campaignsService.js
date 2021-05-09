const Campaign = require("../models/Campaign");
const Bonus = require("../models/Bonus");

async function saveFile(file) {    
    if (file) {
        const name = Date.now() + file.originalname;
        const firebaseFile = firebase.bucket.file(name);
        await firebaseFile.save(file.buffer);
        // const signedUrl = await firebaseFile.getSignedUrl();
        // console.log("signed " + signedUrl);
        // const publicUrl = firebaseFile.publicUrl();
        // console.log("publicUrl " + publicUrl);
        return name;
    }    
}


exports.saveFile = saveFile;