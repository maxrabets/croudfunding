const express = require("express");
const reactionsController = require("../controllers/reactionsController");
const reactionsRouter = express.Router({mergeParams: true});
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

reactionsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:reactions'], {customScopeKey: 'permissions'}), 
    reactionsController.createReaction);

reactionsRouter.get("/", reactionsController.getCommentReactions);
 
module.exports = reactionsRouter;