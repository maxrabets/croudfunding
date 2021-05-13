const express = require("express");
const newsController = require("../controllers/newsController");
const newsRouter = express.Router({mergeParams: true});
const upload = require('../config/multer');
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

newsRouter.get("/",  newsController.getCampaignNews);

newsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:news'], {customScopeKey: 'permissions'}),
    upload.single('image'),
    newsController.createPost);

newsRouter.put("/:postId", jwtCheck, 
    jwtAuthz(['change:news'], {customScopeKey: 'permissions'}),
    upload.single('image'),
    newsController.changePost);

newsRouter.delete("/:postId", jwtCheck, 
    jwtAuthz(['delete:news'], {customScopeKey: 'permissions'}),
    newsController.deletePost);

module.exports = newsRouter;