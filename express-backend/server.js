const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwtCheck = require('./auth/jwt');
const camapignsRouter = require("./routes/campaignsRouter");
const cors = require('cors');

var port = process.env.PORT || 8080;

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(jwtCheck);
app.use((req,res, next) => {
  console.log(req);
  next();
})

app.use("/profile/campaigns", camapignsRouter);;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});