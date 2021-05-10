const express = require("express");
const usersController = require("../controllers/usersController.js");
const camapignsRouter = express.Router();
const jwtCheck = require('../auth/jwt');

camapignsRouter.post("/registration", jwtCheck, 
    usersController.registerUser);
 
module.exports = camapignsRouter;