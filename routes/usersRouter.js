const express = require("express");
const usersController = require("../controllers/usersController.js");
const camapignsRouter = express.Router();
const jwtCheck = require('../auth/jwt');

camapignsRouter.post("/registration", jwtCheck, 
    usersController.registerUser); 

camapignsRouter.get("/:userId/bonuses", usersController.getUserBonuses);

camapignsRouter.get("/:userId", usersController.getUser);
 
module.exports = camapignsRouter;