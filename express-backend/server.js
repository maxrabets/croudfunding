const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwtCheck = require('./jwt');
const camapignsRouter = require("./routes/camapignsRouter.js");

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(jwtCheck);

app.use("/profile/campaigns", camapignsRouter);;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});