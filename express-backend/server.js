const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwtCheck = require('./jwt')

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(jwtCheck);

app.listen(port);