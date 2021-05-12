const express = require("express");
const camapignsController = require("../controllers/campaignsController.js");
const camapignsRouter = express.Router();
const upload = require('../config/multer');
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

camapignsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:campaigns'], {customScopeKey: 'permissions'}), 
    upload.array('images'),
    camapignsController.createCampaign);
camapignsRouter.put("/:campaignId", jwtCheck, 
    jwtAuthz(['edit:campaigns'], {customScopeKey: 'permissions'}), 
    upload.array('images'),
    camapignsController.editCampaign);
camapignsRouter.delete("/:campaignId", jwtCheck, 
    jwtAuthz(['delete:campaigns'], {customScopeKey: 'permissions'}),
    camapignsController.deleteCampaign);
camapignsRouter.get("/", camapignsController.getUserCampaigns);

camapignsRouter.get("/categories", camapignsController.getCategories);
camapignsRouter.get("/:campaignId", camapignsController.getCampaign);

camapignsRouter.post("/:campaignId/payment",  jsonParser, jwtCheck, 
    jwtAuthz(['create:payment'], {customScopeKey: 'permissions'}), 
    camapignsController.createPayment);

camapignsRouter.get("/:campaignId/news",  camapignsController.getCampaignNews);
camapignsRouter.post("/:campaignId/news", jwtCheck, 
    jwtAuthz(['create:news'], {customScopeKey: 'permissions'}),
    upload.single('image'),
    camapignsController.createPost);
camapignsRouter.put("/:campaignId/news/:postId", jwtCheck, 
    jwtAuthz(['change:news'], {customScopeKey: 'permissions'}),
    upload.single('image'),
    camapignsController.changePost);
camapignsRouter.delete("/:campaignId/news/:postId", jwtCheck, 
    jwtAuthz(['delete:news'], {customScopeKey: 'permissions'}),
    camapignsController.deletePost);
 
module.exports = camapignsRouter;