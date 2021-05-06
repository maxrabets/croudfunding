const express = require("express");
const camapignsController = require("../controllers/campaignsController.js");
const camapignsRouter = express.Router();
const upload = require('../config/multer');

camapignsRouter.post("/create", uploader.single('image'), 
    camapignsController.createCampaign);
 
module.exports = camapignsRouter;