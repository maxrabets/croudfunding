const firebase = require('../config/firebaseStorage');
const fs = require('fs');

const SEPARATOR = "_";

function createUniqueName(name) {
    const uniqueName = Date.now() + SEPARATOR + name;
    return uniqueName;
}

function getOriginalName(uniqueName) {
    const index = uniqueName.indexOf(SEPARATOR);
    return uniqueName.substring(index+1);
}

async function saveFile(file) {    
    if (file) {
        const uniqueName = createUniqueName(file.originalname);
        const firebaseFile = firebase.bucket.file(uniqueName);
        await firebaseFile.save(file.buffer);
        // const signedUrl = await firebaseFile.getSignedUrl();
        // console.log("signed " + signedUrl);
        // const publicUrl = firebaseFile.publicUrl();
        // console.log("publicUrl " + publicUrl);
        return uniqueName;
    }
}

async function saveFiles(files) {
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
    if(name) {
        const firebaseFile = firebase.bucket.file(name);
        const data = await firebaseFile.download();
        console.log()
        return {buffer: data[0], name: getOriginalName(name)};
    }
    return false;
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

async function deleteFile(name) {    
    if(name) {
        const firebaseFile = firebase.bucket.file(name);
        if(firebaseFile){
            const data = await firebaseFile.delete();///hjjh
            return data[0];
        }
    }
    return false;
}

async function deleteFiles(names) {    
    const responses = [];
    for(let i = 0; i < names.length; i++) {
        const response = await deleteFile(names[i]);
        if(response){
            responses.push(response);
        }
        else
            return false;
    }
    return responses;  
}

exports.saveFile = saveFile;
exports.saveFiles = saveFiles;
exports.getFile = getFile;
exports.getFiles = getFiles;
exports.deleteFile = deleteFile;
exports.deleteFiles = deleteFiles;