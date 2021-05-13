const express = require("express");
const camapignsController = require("../controllers/campaignsController.js");
const camapignsRouter = express.Router();
const categoriesRouter = require("./categoriesRouter");
const newsRouter = require("./newsRouter");
const paymentsRouter = require("./paymentsRouter");
const upload = require('../config/multer');
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

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

camapignsRouter.use("/categories", categoriesRouter);

camapignsRouter.get("/:campaignId", camapignsController.getCampaign);

camapignsRouter.use("/:campaignId/payment", paymentsRouter);

camapignsRouter.use("/:campaignId/news",  newsRouter);

 
module.exports = camapignsRouter;