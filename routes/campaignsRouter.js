const express = require("express");
const campaignsControler = require("../controllers/campaignsController.js");
const camapignsRouter = express.Router();
const categoriesRouter = require("./categoriesRouter");
const newsRouter = require("./newsRouter");
const paymentsRouter = require("./paymentsRouter");
const commentsRouter = require("./commentsRouter");
const upload = require('../config/multer');
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

camapignsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:campaigns'], {customScopeKey: 'permissions'}), 
    upload.array('images'),
    campaignsControler.createCampaign);

camapignsRouter.put("/:campaignId", jwtCheck, 
    jwtAuthz(['edit:campaigns'], {customScopeKey: 'permissions'}), 
    upload.array('images'),
    campaignsControler.editCampaign);

camapignsRouter.delete("/:campaignId", jwtCheck, 
    jwtAuthz(['delete:campaigns'], {customScopeKey: 'permissions'}),
    campaignsControler.deleteCampaign);

camapignsRouter.get("/", campaignsControler.getUserCampaigns);

camapignsRouter.get("/count", campaignsControler.getCampaignsCount);

camapignsRouter.get("/tags", campaignsControler.getAllTags);

camapignsRouter.get("/page", campaignsControler.getPage);

camapignsRouter.use("/categories", categoriesRouter);

camapignsRouter.get("/:campaignId", campaignsControler.getCampaign);

camapignsRouter.use("/:campaignId/payment", paymentsRouter);

camapignsRouter.use("/:campaignId/news",  newsRouter);

camapignsRouter.use("/:campaignId/comments",  commentsRouter);

camapignsRouter.post("/:campaignId/ratings", jwtCheck, 
    jwtAuthz(['rate:campaigns'], {customScopeKey: 'permissions'}),
    campaignsControler.rateCampaign);
 
module.exports = camapignsRouter;