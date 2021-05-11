const express = require("express");
const camapignsController = require("../controllers/campaignsController.js");
const camapignsRouter = express.Router();
const upload = require('../config/multer');
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

camapignsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:campaigns'], {customScopeKey: 'permissions'}), 
    upload.array('images'),
    camapignsController.createCampaign);
camapignsRouter.get("/categories", camapignsController.getCategories);
camapignsRouter.get("/", camapignsController.getUserCampaigns);
camapignsRouter.get("/:campaignId", camapignsController.getCampaign);

camapignsRouter.get("/:campaignId/news", camapignsController.getCampaignNews);
camapignsRouter.post("/:campaignId/news", jwtCheck, 
    jwtAuthz(['create:news'], {customScopeKey: 'permissions'}),
    camapignsController.createPost);
camapignsRouter.put("/:campaignId/news/:postId", jwtCheck, 
    jwtAuthz(['change:news'], {customScopeKey: 'permissions'}),
    camapignsController.changePost);
camapignsRouter.delete("/:campaignId/news/:postId", jwtCheck, 
    jwtAuthz(['delete:news'], {customScopeKey: 'permissions'}),
    camapignsController.deletePost);

camapignsRouter.delete("/:campaignId", jwtCheck, 
    jwtAuthz(['delete:campaigns'], {customScopeKey: 'permissions'}),
    camapignsController.deleteCampaign);
 
module.exports = camapignsRouter;