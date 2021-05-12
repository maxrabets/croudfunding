const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const camapignsRouter = require("./routes/campaignsRouter");
const usersRouter = require("./routes/usersRouter");
const cors = require('cors');
const sequelize = require("./config/sequelize");
const Category = require("./models/Category");
const Campaign = require("./models/Campaign");
const Image = require("./models/Image");
const Bonus = require("./models/Bonus");
const Tag = require("./models/Tag");
require("./models/associations");
require('dotenv').config();


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

app.use("/campaigns", camapignsRouter);
app.use("/users", usersRouter); 

sequelize.sync({force: false}).then(async (result)=>{
// /////////////////
  // await Category.create({name: "IT"});
  // await Category.create({name: "Education"});
  // await Category.create({name: "Fashion"});
  // await Category.create({name: "Medicine"});
  ////////////////////////

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch(err=> console.log(err));