const express = require("express");
const paymentsController = require("../controllers/paymentsController");
const paymentsRouter = express.Router({mergeParams: true});
const jwtAuthz = require('express-jwt-authz');
const jwtCheck = require('../auth/jwt');

paymentsRouter.post("/", jwtCheck, 
    jwtAuthz(['create:payment'], {customScopeKey: 'permissions'}), 
    paymentsController.createPayment);

module.exports = paymentsRouter;