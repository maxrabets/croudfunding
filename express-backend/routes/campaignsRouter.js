const express = require("express");
const camapignsController = require("../controllers/campaignsController.js");
const camapignsRouter = express.Router();
const upload = require('../config/multer');
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

camapignsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:campaign'], {customScopeKey: 'permissions'}), 
    upload.array('images'),
    camapignsController.createCampaign);

camapignsRouter.get("/categories", camapignsController.getCategories);
 
module.exports = camapignsRouter;