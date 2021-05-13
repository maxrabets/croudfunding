const express = require("express");
const commentsController = require("../controllers/commentsController");
const commentsRouter = express.Router({mergeParams: true});
const reactionsRouter = require("./reactionsRouter");
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

commentsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:comments'], {customScopeKey: 'permissions'}), 
    commentsController.createComment);

commentsRouter.get("/", commentsController.getCampaignComments);

commentsRouter.use("/:commentId/reactions", reactionsRouter);
 
module.exports = commentsRouter;