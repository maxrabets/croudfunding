const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const storage = new Storage({
    credentials: JSON.parse(process.env.GCLOUD_APPLICATION_CREDENTIALS)
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

exports.bucket = bucket;
exports.storage = storage;
